import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QuoteCartProvider } from "@/lib/quoteCart";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import ContractManufacturing from "@/pages/ContractManufacturing";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Sectors from "@/pages/Sectors";
import SectorDetail from "@/pages/SectorDetail";
import Pricing from "@/pages/Pricing";
import WhyUs from "@/pages/WhyUs";
import Referral from "@/pages/Referral";
import ISO from "@/pages/ISO";
import PricingPolicy from "@/pages/PricingPolicy";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Security from "@/pages/Security";
import Terms from "@/pages/Terms";
import FAQ from "@/pages/FAQ";
import Career from "@/pages/Career";
import Investor from "@/pages/Investor";
import Materials from "@/pages/Materials";
import MaterialCategory from "@/pages/MaterialCategory";
import MaterialProduct from "@/pages/MaterialProduct";
import QuoteCart from "@/pages/QuoteCart";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BookDemoButton } from "@/components/BookDemoButton";
import { BackToTop } from "@/components/BackToTop";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/contract-manufacturing" component={ContractManufacturing} />
        <Route path="/sectors" component={Sectors} />
        <Route path="/sectors/:slug" component={SectorDetail} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/contact" component={Contact} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/why-us" component={WhyUs} />
        <Route path="/referral" component={Referral} />
        <Route path="/iso" component={ISO} />
        <Route path="/pricing-policy" component={PricingPolicy} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/security" component={Security} />
        <Route path="/terms" component={Terms} />
        <Route path="/faq" component={FAQ} />
        <Route path="/career" component={Career} />
        <Route path="/careers" component={Career} />
        <Route path="/investor-relations" component={Investor} />
        <Route path="/investors" component={Investor} />
        <Route path="/materials" component={Materials} />
        <Route path="/materials/:category" component={MaterialCategory} />
        <Route path="/materials/:category/:product" component={MaterialProduct} />
        <Route path="/quote-cart" component={QuoteCart} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <QuoteCartProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </QuoteCartProvider>
        <WhatsAppButton />
        <BookDemoButton />
        <BackToTop />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
