import React from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./contexts/theme";
import { UserPreferencesProvider } from "./contexts/user-preferences";
import { WatchHistoryProvider } from "./contexts/watch-history";
import { UserProfileProvider } from "./contexts/user-profile-context";
import { NotificationProvider } from "./contexts/notification-context";
import { ServiceWorkerErrorBoundary } from "./components/ServiceWorkerErrorBoundary";
import { ServiceWorkerDebugPanel } from "./components/ServiceWorkerDebugPanel";
import { AuthProvider } from "./hooks/auth-context"; // ✅ IMPORTANT (put back)
import SEO from "./components/SEO";
import AppRoutes from "./routes.tsx";
import "./styles/notifications.css";
import { FeatureNotificationsListener } from "./hooks/FeatureNotificationsListener";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
    },
  },
});

function App() {
  const isDevelopment = import.meta.env.DEV;

  return (
    <HelmetProvider>
      <SEO themeColor="#000000" />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LazyMotion features={domAnimation}>
            <ServiceWorkerErrorBoundary>
              <ThemeProvider>
                <NotificationProvider>
                  <AuthProvider>
                    <UserPreferencesProvider>
                      <WatchHistoryProvider>
                        <UserProfileProvider>
                          <>
                            <FeatureNotificationsListener />
                            {isDevelopment && <ServiceWorkerDebugPanel />}
                            <AppRoutes />
                          </>
                        </UserProfileProvider>
                      </WatchHistoryProvider>
                    </UserPreferencesProvider>
                  </AuthProvider>
                </NotificationProvider>
              </ThemeProvider>
            </ServiceWorkerErrorBoundary>
          </LazyMotion>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;