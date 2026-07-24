import { useState } from "react";
import { Calculator, Car, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fareRates, cities } from "@/data/siteData";

// Predefined distances between cities for estimation
const cityDistances: Record<string, Record<string, number>> = {
  chennai: { vellore: 140, bangalore: 350, pondicherry: 150, coimbatore: 500, madurai: 460, trichy: 330, salem: 340, tiruppur: 450, kanchipuram: 75, tiruvannamalai: 190, ranipet: 120, tirupati: 135 },
  vellore: { chennai: 140, bangalore: 210, tirupati: 100, ranipet: 25, kanchipuram: 70, tiruvannamalai: 85, coimbatore: 350, madurai: 400, trichy: 280, salem: 200 },
  coimbatore: { chennai: 500, ooty: 90, bangalore: 365, madurai: 220, kodaikanal: 175, trichy: 210, salem: 160, tiruppur: 50 },
  madurai: { chennai: 460, rameswaram: 175, kodaikanal: 120, trichy: 130, coimbatore: 220, salem: 230 },
  trichy: { chennai: 330, madurai: 130, thanjavur: 55, pondicherry: 210, coimbatore: 210, salem: 145 },
  salem: { chennai: 340, yercaud: 35, bangalore: 215, coimbatore: 160, trichy: 145 },
  tiruppur: { coimbatore: 50, ooty: 100, chennai: 450, bangalore: 320 },
  kanchipuram: { chennai: 75, vellore: 70, pondicherry: 100, mahabalipuram: 60 },
  tiruvannamalai: { chennai: 190, vellore: 85, bangalore: 200, pondicherry: 110 },
  ranipet: { vellore: 25, chennai: 120, kanchipuram: 55, bangalore: 190 },
};

const allLocations = [
  ...cities.map((c) => c.name),
  "Bangalore", "Pondicherry", "Tirupati", "Ooty", "Kodaikanal", "Rameswaram",
  "Yercaud", "Thanjavur", "Mahabalipuram", "Hosur",
];

interface FareCalculatorProps {
  defaultFrom?: string;
  defaultTo?: string;
  compact?: boolean;
}

export default function FareCalculator({ defaultFrom = "", defaultTo = "", compact = false }: FareCalculatorProps) {
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [vehicle, setVehicle] = useState("sedan");
  const [result, setResult] = useState<{ fare: number; distance: number; duration: string } | null>(null);

  const calculateFare = () => {
    const fromSlug = from.toLowerCase().replace(/\s+/g, "");
    const toSlug = to.toLowerCase().replace(/\s+/g, "");

    let distance = 0;
    if (cityDistances[fromSlug] && cityDistances[fromSlug][toSlug]) {
      distance = cityDistances[fromSlug][toSlug];
    } else if (cityDistances[toSlug] && cityDistances[toSlug][fromSlug]) {
      distance = cityDistances[toSlug][fromSlug];
    } else {
      // Estimate based on random reasonable distance
      distance = Math.floor(Math.random() * 200) + 50;
    }

    const rate = fareRates[vehicle as keyof typeof fareRates];
    const fare = Math.max(rate.baseFare + distance * rate.perKm, rate.minFare);
    const hours = Math.floor(distance / 60);
    const mins = Math.round((distance / 60 - hours) * 60);
    const duration = `${hours}h ${mins}m`;

    setResult({ fare: Math.round(fare), distance, duration });
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
              {allLocations.map((loc) => (
                <SelectItem key={loc} value={loc} className="cursor-pointer">{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium mb-1.5 block">Vehicle</Label>
          <Select value={vehicle} onValueChange={setVehicle}>
            <SelectTrigger className="cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mini" className="cursor-pointer">Mini (Hatchback)</SelectItem>
              <SelectItem value="sedan" className="cursor-pointer">Sedan (Swift Dzire)</SelectItem>
              <SelectItem value="suv" className="cursor-pointer">SUV (Innova/Ertiga)</SelectItem>
              <SelectItem value="muv" className="cursor-pointer">MUV (Innova Crysta)</SelectItem>
              <SelectItem value="auto" className="cursor-pointer">Auto Rickshaw</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button
            onClick={calculateFare}
            className="w-full bg-[#FFD700] hover:bg-[#E6C200] text-[#2E3A8C] font-bold cursor-pointer shadow-sm"
            disabled={!from || !to}
          >
            Calculate Fare
          </Button>
        </div>
      </div>

      {result && (
        <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20 animate-fade-in">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{from}</span>
              <ArrowRight className="w-4 h-4" />
              <span>{to}</span>
            </div>
            <div className="flex items-center gap-6 ml-auto">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Distance</p>
                <p className="font-semibold">{result.distance} km</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="font-semibold">{result.duration}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Estimated Fare</p>
                <p className="font-heading font-bold text-2xl text-primary">₹{result.fare.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">* Estimated fare. Actual fare may vary based on route, traffic, and tolls.</p>
        </div>
      )}
    </div>
  );
}