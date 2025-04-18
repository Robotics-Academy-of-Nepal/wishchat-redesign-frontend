import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
// import logo from "../../assets/wishchat-logo.png";

// These component imports would need to be adjusted based on your project structure
const Button = ({ children, type, variant, onClick, disabled, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
};

const Input = ({
  id,
  type,
  value,
  onChange,
  className,
  placeholder,
  autoComplete,
}) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />
  );
};

const Card = ({ children, className }) => {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};

const Label = ({ htmlFor, children, className }) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { invitation_code } = useParams();

  useEffect(() => {
    if (invitation_code) {
      console.log("Extracted invitation code:", invitation_code);
    }
  }, [invitation_code]);

  // Simple toast function - replace with your toast implementation
  const toast = (message) => {
    console.log(message);
    setMessage(message.title + ": " + message.description);
  };

  const handleLoginSuccess = (response) => {
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      // Update these to match your actual response structure
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("FirstName", response.data.user.first_name);
      localStorage.setItem("LastName", response.data.user.last_name);
      localStorage.setItem("Picture", response.data.google_data.picture);
      localStorage.setItem("Picture", response.data.google_data.picture);
      localStorage.setItem("ID", response.data.user.id);
      localStorage.setItem("username", response.data.user.username);

      // Check for organization instead of company_name
      if (response.data.has_organization && response.data.organization) {
        localStorage.setItem("org_id", response.data.organization.id);
        localStorage.setItem("org_name", response.data.organization.name);
        localStorage.setItem("is_owner", response.data.organization.is_owner);
        localStorage.setItem("companyname", response.data.organization.name);
        navigate("/dashboard");
      } else {
        navigate("/createOrganization");
      }
    }
  };

  const handleGoogleLogin = (credentialResponse) => {
    setIsLoading(true);
    console.log(
      "Sending Google token and invitation code:",
      credentialResponse.credential,
      invitation_code
    );

    // Send the Google token and invitation code (if available) to backend
    axios
      .post(`${import.meta.env.VITE_API_URL}auth/google-login/`, {
        auth_token: credentialResponse.credential,
        invitation_code: invitation_code, // Include invitation code from URL path
      })
      .then((response) => {
        handleLoginSuccess(response);
      })
      .catch((error) => {
        setMessage(
          "Error: " + (error.response?.data?.message || "Google login failed.")
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Here you would typically call your API to handle username/password login
      console.log("Logging in with:", { username, password });

      // For demonstration purposes only
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Success",
        description: "Logged in successfully",
      });

      // Navigate to dashboard after successful login
      navigate("/createOrganization");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "Failed to login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-blue-200">
      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="z-10 w-full max-w-md px-4"
      >
        <Card className="backdrop-blur-md bg-white/70 shadow-lg border-0 overflow-hidden">
          <div className="p-6 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 text-center"
            >
              <h1 className="text-2xl font-semibold text-gray-800 mb-1">
                Welcome Back
              </h1>
              <p className="text-gray-600">Sign in to your account</p>
            </motion.div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700"
                >
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your username"
                  autoComplete="username"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </Label>
                  <a
                    href="#"
                    className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors py-2 px-4 rounded-md font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative flex items-center justify-center">
                <div className="border-t border-gray-300 absolute w-full"></div>
                <span className="bg-white/70 px-2 text-sm text-gray-500 relative">
                  Or continue with
                </span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-4 flex justify-center"
              >
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    setMessage("Google login failed. Please try again.");
                  }}
                  useOneTap
                />
              </motion.div>
            </div>

            {message && (
              <div className="mt-4 text-center text-sm text-red-600">
                {message}
              </div>
            )}

            <div className="mt-6 text-center text-sm text-gray-600">
              {" Don't have an account?"}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Sign up
              </a>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
