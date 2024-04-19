import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import * as pages from "@/pages";
import { AuthProvider,useAuth } from "@/hooks/useAuth";
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  console.log("🚀 ~ ProtectedRoute ~ user:", user)
  
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

const Home = pages.HomePage
const Login =pages.LoginPage
const User = pages.UserPage
function AppRoute() {
  return (
    <AuthProvider>
      <Routes>
      <Route path="login" element={<Login/>}/>
        <Route path="/" element={
            <ProtectedRoute>
                <Home/>
            </ProtectedRoute>
        } />
         <Route path="/user" element={
            <ProtectedRoute>
                <User/>
            </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default AppRoute;
