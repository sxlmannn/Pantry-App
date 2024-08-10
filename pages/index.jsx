import { useRouter } from 'next/router';
import Button from '@mui/material/Button';

export default function LandingPage() {
  const router = useRouter();

  const handleExploreClick = () => {
    router.push('/auth'); // Change '/auth' to the path of your authentication page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome to your Pantry Tracker</h1>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleExploreClick}
      >
        Ready to Explore
      </Button>
    </div>
  );
}
