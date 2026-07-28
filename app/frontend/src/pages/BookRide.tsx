import { useState } from "react";
import { MapPin, ArrowRight, Car, Phone, Shield, Clock, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { cities, fareRates, companyInfo } from "@/data/siteData";

const allLocations = [
  ...cities.map((c) => c.name),
  "Bangalore", "Pondicherry", "Tirupati", "Ooty", "Kodaikanal", "Rameswaram", "Yercaud", "Thanjavur", "Mahabalipuram",
];

const vehicles = [
  { id: "mini", name: "Mini", desc: "Hatchback (WagonR, Alto)", capacity: "3 passengers", rate: fareRates.mini },
  { id: "sedan", name: "Sedan", desc: "Swift Dzire, Etios", capacity: "4 passengers", rate: fareRates.sedan },
  { id: "suv", name: "SUV", desc: "Ertiga, Innova", capacity: "6 passengers", rate: fareRates.suv },
  { id: "muv", name: "MUV", desc: "Innova Crysta", capacity: "7 passengers", rate: fareRates.muv },
];

export default function BookRide() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tripType, setTripType] = useState("one-way");
  const [vehicle, setVehicle] = useState("sedan");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-screen-md mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="font-heading text-3xl font-bold mb-4">Booking Request Received!</h1>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Our team will confirm your ride shortly. You'll receive a call/SMS with driver details within 15 minutes.
        </p>
        <div className="bg-muted rounded-xl p-6 text-left max-w-sm mx-auto mb-8">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">From:</span><span className="font-medium">{from}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">To:</span><span className="font-medium">{to}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Vehicle:</span><span className="font-medium capitalize">{vehicle}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Trip:</span><span className="font-medium capitalize">{tripType}</span></div>
            {date && <div className="flex justify-between"><span className="text-muted-foreground">Date:</span><span className="font-medium">{date}</span></div>}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={`tel:${companyInfo.phone}`}>
            <Button className="bg-primary hover:bg-primary/90 cursor-pointer">
              <Phone className="w-4 h-4 mr-2" /> Call to Confirm
            </Button>
          </a>
          <Button variant="outline" onClick={() => setSubmitted(false)} className="cursor-pointer">
            Book Another Ride
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-[#1E2A6E] to-[#2E3A8C] text-white py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">Book Your Ride</h1>
          <p className="text-gray-300 max-w-lg">Plan your journey with ease and book your ride online for a safe, comfortable and reliable travel experience.</p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Trip Type */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Trip Type</Label>
                <RadioGroup value={tripType} onValueChange={setTripType} className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="one-way" id="one-way" className="cursor-pointer" />
                    <Label htmlFor="one-way" className="cursor-pointer">One Way</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="round-trip" id="round-trip" className="cursor-pointer" />
                    <Label htmlFor="round-trip" className="cursor-pointer">Round Trip</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="local" id="local" className="cursor-pointer" />
                    <Label htmlFor="local" className="cursor-pointer">Local (Hourly)</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* From / To */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Pickup Location</Label>
                  <Select value={from} onValueChange={setFrom}>
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue placeholder="Select pickup city" />
                    </SelectTrigger>
                    <SelectContent>
                      {allLocations.map((loc) => (
                        <SelectItem key={loc} value={loc} className="cursor-pointer">{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Drop Location</Label>
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
              </div>

              {/* Date & Time */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Pickup Date</Label>
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="cursor-pointer" />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Pickup Time</Label>
                  <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="cursor-pointer" />
                </div>
              </div>

              {/* Vehicle Selection */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Select Vehicle</Label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {vehicles.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => setVehicle(v.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        vehicle === v.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Car className={`w-8 h-8 ${vehicle === v.id ? "text-primary" : "text-muted-foreground"}`} />
                        <div>
                          <p className="font-semibold">{v.name}</p>
                          <p className="text-xs text-muted-foreground">{v.desc}</p>
                          <p className="text-xs text-muted-foreground">{v.capacity} • ₹{v.rate.perKm}/km</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Your Name</Label>
                  <Input placeholder="Enter your name" />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Phone Number</Label>
                  <Input placeholder="+91 XXXXX XXXXX" type="tel" />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#FFD700] hover:bg-[#E6C200] text-[#2E3A8C] font-bold text-base cursor-pointer shadow-sm"
                disabled={!from || !to}
              >
                Confirm Booking <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold mb-4">Why Book with Root Cabs?</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2"><Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Verified & trained drivers with background checks</li>
                  <li className="flex items-start gap-2"><Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Free cancellation up to 30 minutes before pickup</li>
                  <li className="flex items-start gap-2"><Star className="w-4 h-4 text-primary mt-0.5 shrink-0" /> ₹50 cashback on your first ride</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" /> No surge pricing - transparent fares always</li>
                  <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Live GPS tracking shared with family</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-primary/5">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold mb-2">Need Immediate Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">Call us directly for instant booking assistance.</p>
                <a href={`tel:${companyInfo.phone}`}>
                  <Button className="w-full bg-primary hover:bg-primary/90 cursor-pointer">
                    <Phone className="w-4 h-4 mr-2" /> {companyInfo.phone}
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold mb-3">Fare Rates</h3>
                <div className="space-y-2 text-sm">
                  {vehicles.map((v) => (
                    <div key={v.id} className="flex justify-between items-center py-1 border-b border-border last:border-0">
                      <span>{v.name}</span>
                      <span className="font-semibold text-primary">₹{v.rate.perKm}/km</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">* Base fare + per km charges. Toll extra.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
