"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import ForgotPasswordModal from "@/components/ForgotPasswordModal";

export default function Login() {
  const [activeTab, setActiveTab] = useState("traveler");
  const [slidePosition, setSlidePosition] = useState(0);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const { signInWithGoogle, signInWithFacebook, user, userProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setSlidePosition(activeTab === "traveler" ? 0 : -50);
  }, [activeTab]);

  useEffect(() => {
    if (user && userProfile) {
      if (userProfile.role === "tenant") {
        router.push("/tenant");
      } else {
        router.push("/");
      }
    }
  }, [user, userProfile, router]);

  const handleGoogleSignIn = async () => {
    try {
      localStorage.setItem("selectedRole", activeTab);
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      localStorage.setItem("selectedRole", activeTab);
      await signInWithFacebook();
    } catch (error) {
      console.error("Error signing in with Facebook:", error);
    }
  };

  const handleForgotPasswordClick = () => {
    setIsForgotPasswordModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center py-6 px-4 sm:py-12 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-md w-full space-y-4 sm:space-y-5">
          <div className="text-center">
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">
              Selamat Datang Kembali
            </h2>
          </div>

          <Card className="w-full border-0 shadow-none">
            <CardHeader>
              <CardTitle className="text-center">Pilih Jenis Akun</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full h-10 grid-cols-2">
                  <TabsTrigger value="traveler">Traveler</TabsTrigger>
                  <TabsTrigger value="tenant">Tenant</TabsTrigger>
                </TabsList>

                {/* Sliding Container */}
                <div className="relative overflow-hidden mt-4">
                  <div
                    className="flex w-[200%] transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(${slidePosition}%)` }}
                  >
                    <LoginForm
                      type="traveler"
                      onGoogleSignIn={handleGoogleSignIn}
                      onFacebookSignIn={handleFacebookSignIn}
                      onForgotPasswordClick={handleForgotPasswordClick}
                    />
                    <LoginForm
                      type="tenant"
                      onGoogleSignIn={handleGoogleSignIn}
                      onFacebookSignIn={handleFacebookSignIn}
                      onForgotPasswordClick={handleForgotPasswordClick}
                    />
                  </div>
                </div>
              </Tabs>

              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Belum punya akun?{" "}
                  <a
                    href="/register"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Daftar di sini
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:flex-1 relative">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Beautiful hotel lobby"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onClose={() => setIsForgotPasswordModalOpen(false)}
      />
    </div>
  );
}
