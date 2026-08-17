import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cities } from "@/data/siteData";
import { FareEstimateData, FareEstimateRequest, getFareEstimate } from "@/lib/fareEstimate";
import { searchAddressDetailed } from "@/lib/bookRideAuth";

const allLocations = [
  ...cities.map((c) => c.name),
  "Bangalore", "Pondicherry", "Tirupati", "Ooty", "Kodaikanal", "Rameswaram",
  "Yercaud", "Thanjavur", "Mahabalipuram", "Hosur",
];

const routeUnavailableMessage =
  "This route is not available for fare calculation right now. Please select another pickup or destination. If you need help, call support at +91 8608606474.";

interface FareCalculatorProps {
  defaultFrom?: string;
  defaultTo?: string;
  compact?: boolean;
  showBookNowButton?: boolean;
}

export default function FareCalculator({
  defaultFrom = "",
  defaultTo = "",
  compact = false,
  showBookNowButton = false,
}: FareCalculatorProps) {
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [vehicle, setVehicle] = useState<FareEstimateRequest["cabType"]>("Sedan");
  const [result, setResult] = useState<FareEstimateData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const destinationLocations = allLocations.filter((loc) => loc !== from);

  useEffect(() => {
    if (from && to === from) {
      setTo("");
    }
  }, [from, to]);

  const calculateFare = async () => {
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const [fromMatches, toMatches] = await Promise.all([
        searchAddressDetailed(from, { allowLocalFallback: false }),
        searchAddressDetailed(to, { allowLocalFallback: false }),
      ]);
      const pickup = fromMatches.find((item) => typeof item.latitude === "number" && typeof item.longitude === "number");
      const drop = toMatches.find((item) => typeof item.latitude === "number" && typeof item.longitude === "number");

      if (!pickup || !drop) {
        throw new Error(routeUnavailableMessage);
      }

      const estimate = await getFareEstimate({
        cabType: vehicle,
        pickupLat: pickup.latitude as number,
        pickupLong: pickup.longitude as number,
        dropLat: drop.latitude as number,
        dropLong: drop.longitude as number,
      });
      setResult(estimate);
    } catch (err) {
      setError(err instanceof Error ? err.message : routeUnavailableMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-border ${compact ? "p-4" : "p-6 shadow-lg"}`}>
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-primary" />
        <h3 className={`font-heading font-semibold ${compact ? "text-lg" : "text-xl"}`}>Fare Calculator</h3>
      </div>

      <div className={`grid ${compact ? "grid-cols-1 gap-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"}`}>
        <div>
          <Label className="text-sm font-medium mb-1.5 block">From</Label>
          <Select value={from} onValueChange={setFrom}>
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="Select pickup" />
            </SelectTrigger>
            <SelectContent>
              {allLocations.map((loc) => (
                <SelectItem key={loc} value={loc} className="cursor-pointer">{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium mb-1.5 block">To</Label>
          <Select value={to} onValueChange={setTo}>
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              {destinationLocations.map((loc) => (
                <SelectItem key={loc} value={loc} className="cursor-pointer">{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium mb-1.5 block">Vehicle</Label>
          <Select value={vehicle} onValueChange={(value) => setVehicle(value as FareEstimateRequest["cabType"])}>
            <SelectTrigger className="cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mini" className="cursor-pointer">Mini (Hatchback)</SelectItem>
              <SelectItem value="Sedan" className="cursor-pointer">Sedan (Swift Dzire)</SelectItem>
              <SelectItem value="SUV" className="cursor-pointer">SUV (Innova/Ertiga)</SelectItem>
              <SelectItem value="MUV" className="cursor-pointer">MUV (Innova Crysta)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
            <Button
              onClick={calculateFare}
              className="w-full bg-[#1E2A6E] hover:bg-[#2E3A8C] text-white font-bold cursor-pointer shadow-sm"
              disabled={!from || !to || isLoading}
            >
            {isLoading ? "Calculating..." : "Calculate Fare"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-slate-700">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20 animate-fade-in">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{result.from}</span>
              <ArrowRight className="w-4 h-4" />
              <span>{result.to}</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-white p-3 text-center">
              <p className="text-xs text-muted-foreground">Distance</p>
              <p className="font-semibold">{(result.estimatedDistance ?? result.distanceKm).toLocaleString()} km</p>
            </div>
            <div className="rounded-lg bg-white p-3 text-center">
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="font-semibold">{result.estimatedTime ?? result.duration}</p>
            </div>
            <div className="rounded-lg bg-white p-3 text-center">
              <p className="text-xs text-muted-foreground">Estimated Fare</p>
              <p className="font-heading font-bold text-2xl text-primary">₹{(result.totalAmount ?? result.estimatedFare).toLocaleString()}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">* Estimated fare. Actual fare may vary based on route, traffic, and tolls.</p>
          {showBookNowButton && (
            <div className="mt-4 flex justify-center sm:justify-end">
              <Link to="/book-ride">
                <Button className="bg-[#FFD700] hover:bg-[#E6C200] text-[#2E3A8C] font-bold cursor-pointer shadow-sm">
                  Book Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
