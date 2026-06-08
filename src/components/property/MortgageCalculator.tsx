"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator } from "lucide-react";

export default function MortgageCalculator({ price }: { price: number }) {
  const [loanAmount, setLoanAmount] = useState(price * 0.8);
  const [interestRate, setInterestRate] = useState(4.5);
  const [tenure, setTenure] = useState(30);
  const [monthlyEMI, setMonthlyEMI] = useState(0);

  useEffect(() => {
    const r = interestRate / 12 / 100;
    const n = tenure * 12;
    const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setMonthlyEMI(isNaN(emi) ? 0 : emi);
  }, [loanAmount, interestRate, tenure]);

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="bg-primary text-white rounded-t-xl py-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calculator size={20} className="text-accent" />
          Mortgage Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between">
            <Label className="text-sm font-medium">Loan Amount</Label>
            <span className="text-sm font-bold">${loanAmount.toLocaleString()}</span>
          </div>
          <Slider
            value={[loanAmount]}
            max={price}
            step={1000}
            onValueChange={(val) => {
              const v = Array.isArray(val) ? val[0] : val;
              if (typeof v === "number") setLoanAmount(v);
            }}
            className="[&_[role=slider]]:bg-accent"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <Label className="text-sm font-medium">Interest Rate (%)</Label>
            <span className="text-sm font-bold">{interestRate}%</span>
          </div>
          <Slider
            value={[interestRate]}
            max={15}
            step={0.1}
            onValueChange={(val) => {
              const v = Array.isArray(val) ? val[0] : val;
              if (typeof v === "number") setInterestRate(v);
            }}
            className="[&_[role=slider]]:bg-accent"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <Label className="text-sm font-medium">Tenure (Years)</Label>
            <span className="text-sm font-bold">{tenure} Years</span>
          </div>
          <Slider
            value={[tenure]}
            max={40}
            step={1}
            onValueChange={(val) => {
              const v = Array.isArray(val) ? val[0] : val;
              if (typeof v === "number") setTenure(v);
            }}
            className="[&_[role=slider]]:bg-accent"
          />
        </div>

        <div className="pt-6 border-t border-muted text-center">
          <p className="text-muted-foreground text-sm uppercase tracking-wider mb-1">Monthly Payment</p>
          <p className="text-3xl font-bold text-primary">
            ${monthlyEMI.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            <span className="text-base font-normal text-muted-foreground">/mo</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
