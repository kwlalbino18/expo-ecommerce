import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function App() {
  return (
    <div>
      <h1>HOME PAGE</h1>
      <p>Admin Dashboard</p>

      <SignedOut>
        <div>
          <p>Please sign in to access the admin dashboard</p>
          <SignInButton mode="modal" />
        </div>
      </SignedOut>

      <SignedIn>
        <div>
          <p>Welcome to the admin dashboard!</p>
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
}
export default App;
