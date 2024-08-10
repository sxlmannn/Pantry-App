"use client";

import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase'; // Ensure this path is correct
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import axios from 'axios'; // We'll use axios for making API requests

const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

function fetchRecipes(ingredients) {
  const ingredientString = ingredients.join(',');
  return axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientString}&number=5&apiKey=${API_KEY}`)
    .then(response => response.data)
    .catch(error => console.error('Error fetching recipes:', error));
}

function fetchRecipeDetails(recipeId) {
  return axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`)
    .then(response => response.data)
    .catch(error => console.error('Error fetching recipe details:', error));
}

export default function Component() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recipes, setRecipes] = useState([]); // State to hold recipes
  const [shoppingCart, setShoppingCart] = useState([
    { name: 'Milk', quantity: 2 },
    { name: 'Bread', quantity: 1 },
  ]); // Initial Shopping Cart state

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log('User signed in with Google:', result.user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleEmailSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      console.log('User signed in with Email and Password:', userCredential.user);
    } catch (error) {
      console.error("Error signing in with email and password:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log('User signed out');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const [items, setItems] = useState([
    { name: "Milk", expiration: "2023-10-01" },
    { name: "Bread", expiration: "2023-10-05" },
    { name: "Eggs", expiration: "2023-10-10" },
  ]);

  const [newItem, setNewItem] = useState({ name: "", expiration: "" });

  const addItem = () => {
    setItems([...items, newItem]);
    setNewItem({ name: "", expiration: "" });
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const generateRecipes = async () => {
    const pantryItems = items.map(item => item.name); // Extract the names of pantry items
    const fetchedRecipes = await fetchRecipes(pantryItems);
    setRecipes(fetchedRecipes);
  };

  const addToShoppingCart = (itemName) => {
    setShoppingCart([...shoppingCart, { name: itemName, quantity: 1 }]);
  };

  const removeFromShoppingCart = (index) => {
    setShoppingCart(shoppingCart.filter((_, i) => i !== index));
  };

  const viewRecipeDetails = async (recipeId) => {
    const recipeDetails = await fetchRecipeDetails(recipeId);
    alert(`Recipe: ${recipeDetails.title}\nInstructions: ${recipeDetails.instructions}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-navy-900 via-gray-800 to-navy-900 text-white">
      {!user ? (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
          <Typography variant="h4" component="h1" className="text-black mb-8">
            Sign In to Your Pantry Tracker
          </Typography>
          <Button variant="contained" color="primary" onClick={handleGoogleSignIn}>
            Sign In with Google
          </Button>
          <div className="space-y-4">
            <div className="space-y-2">
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                fullWidth
                InputProps={{
                  style: { color: 'black' } // Dark text for lighter background
                }}
                InputLabelProps={{
                  style: { color: 'black' } // Dark label for better visibility
                }}
              />
            </div>
            <div className="space-y-2">
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                fullWidth
                InputProps={{
                  style: { color: 'black' } // Dark text for lighter background
                }}
                InputLabelProps={{
                  style: { color: 'black' } // Dark label for better visibility
                }}
              />
            </div>
            <Button variant="contained" color="primary" onClick={handleEmailSignIn}>
              Sign In
            </Button>
          </div>
        </div>
      ) : (
        <>
          <header className="p-4 bg-gray-900">
            <Typography variant="h4" component="h1" className="text-2xl font-bold text-white">
              Pantry Tracker
            </Typography>
            <div className="flex items-center justify-end gap-4">
              <div className="flex items-center gap-2">
                <Avatar alt={user.displayName} src="/placeholder-user.jpg" />
                <Typography variant="body1" className="text-sm font-medium text-white">
                  {user.displayName}
                </Typography>
              </div>
              <Button variant="outlined" color="secondary" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </header>
          <main className="p-4 space-y-4">
            <Card>
              <CardHeader
                title="Add Pantry Item"
                subheader="Add a new item to your pantry."
                titleTypographyProps={{ color: 'black' }}
                subheaderTypographyProps={{ color: 'gray' }}
              />
              <CardContent>
                <div className="space-y-4">
                  <TextField
                    id="name"
                    label="Item Name"
                    variant="outlined"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    placeholder="Enter item name"
                    fullWidth
                    InputProps={{
                      style: { color: 'black' } // Dark text for lighter background
                    }}
                    InputLabelProps={{
                      style: { color: 'black' } // Dark label for better visibility
                    }}
                  />
                  <TextField
                    id="expiration"
                    label="Expiration Date"
                    type="date"
                    variant="outlined"
                    value={newItem.expiration}
                    onChange={(e) => setNewItem({ ...newItem, expiration: e.target.value })}
                    InputLabelProps={{ shrink: true, style: { color: 'black' } }}
                    fullWidth
                    InputProps={{
                      style: { color: 'black' } // Dark text for lighter background
                    }}
                  />
                  <Button variant="contained" color="primary" onClick={addItem}>
                    Add Item
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="Pantry Items"
                subheader="List of items in your pantry."
                titleTypographyProps={{ color: 'black' }}
                subheaderTypographyProps={{ color: 'gray' }}
              />
              <CardContent>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ color: 'black' }}>Item</TableCell>
                      <TableCell style={{ color: 'black' }}>Expiration Date</TableCell>
                      <TableCell style={{ color: 'black' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell style={{ color: 'black' }}>{item.name}</TableCell>
                        <TableCell style={{ color: 'black' }}>{item.expiration}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => deleteItem(index)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="Shopping Cart"
                subheader="Items to buy."
                titleTypographyProps={{ color: 'black' }}
                subheaderTypographyProps={{ color: 'gray' }}
              />
              <CardContent>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ color: 'black' }}>Item</TableCell>
                      <TableCell style={{ color: 'black' }}>Quantity</TableCell>
                      <TableCell style={{ color: 'black' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shoppingCart.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell style={{ color: 'black' }}>{item.name}</TableCell>
                        <TableCell style={{ color: 'black' }}>{item.quantity}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => removeFromShoppingCart(index)}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="Create Recipe"
                subheader="Create a recipe using pantry items."
                titleTypographyProps={{ color: 'black' }}
                subheaderTypographyProps={{ color: 'gray' }}
              />
              <CardContent>
                <div className="space-y-4">
                  <TextField
                    id="recipe-name"
                    label="Recipe Name"
                    variant="outlined"
                    placeholder="Enter recipe name"
                    fullWidth
                    InputProps={{
                      style: { color: 'black' } // Dark text for lighter background
                    }}
                    InputLabelProps={{
                      style: { color: 'black' } // Dark label for better visibility
                    }}
                  />
                  <TextareaAutosize
                    id="recipe-ingredients"
                    placeholder="Enter ingredients"
                    className="min-h-[100px] p-2 w-full border border-gray-600 rounded"
                    style={{ color: 'black', backgroundColor: '#F7FAFC' }}
                  />
                  <Button variant="contained" color="primary">
                    Create Recipe
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Button variant="contained" color="primary" onClick={generateRecipes}>
              Generate Recipes
            </Button>
            {recipes.length > 0 && (
              <Card className="mt-4">
                <CardHeader
                  title="Recipes Based on Your Pantry"
                  titleTypographyProps={{ color: 'black' }}
                />
                <CardContent>
                  <ul>
                    {recipes.map((recipe, index) => (
                      <li key={index} className="mb-4">
                        <Typography variant="h6" className="text-black">
                          {recipe.title}
                        </Typography>
                        <img src={recipe.image} alt={recipe.title} className="w-full h-auto rounded-lg" />
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => viewRecipeDetails(recipe.id)}
                          className="mt-2"
                        >
                          View Recipe
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => addToShoppingCart(recipe.title)}
                          className="mt-2 ml-2"
                        >
                          Add to Shopping Cart
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </main>
        </>
      )}
    </div>
  );
}
