"use client";

import React, { useState } from "react";
import Image from "next/image"; // Import Image
import { ChevronDown, Building, Smartphone, Wallet, Check } from "lucide-react"; // Added Check
// Import Select components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge"; // Import Badge
// Removed Tabs imports
import type { PaymentMethodOption } from "@/lib/swap/types";
import { GenericSelector } from "./generic-selector";
import { useSwapContext } from "@/context/swap-context"; // Import context
import { paymentMethods } from "@/lib/swap/data"; // Use standard import

// Removed unused imports: Button, Drawer components, Sheet components, useMediaQuery

export const PaymentMethodSelector = () => {
  // Get state and setters from context
  const {
    selectedBank, // This holds the ID of the selected payment method
    setSelectedBank, // This updates the ID in the context
    bankDrawerOpen, // Renamed context state for clarity? Let's assume it's this.
    setBankDrawerOpen, // Renamed context state setter?
  } = useSwapContext();

  // Local state for the category dropdown
  const [selectedCategory, setSelectedCategory] = useState<
    PaymentMethodOption["category"] | ""
  >("");

  // Find the details of the currently selected payment method
  const selectedOption = paymentMethods.find(
    (option) => option.id === selectedBank
  );

  // Filter options only when the drawer is about to be shown (or always filter?)
  const filteredOptions = paymentMethods.filter(
    (method) => method.category === selectedCategory
  );

  // Handle category selection from the dropdown
  const handleCategoryChange = (
    newCategory: PaymentMethodOption["category"]
  ) => {
    if (!newCategory) return;
    setSelectedCategory(newCategory);
    // Don't automatically select first item anymore
    // Instead, just open the drawer to show options for this category
    setBankDrawerOpen(true);
  };

  // Handle the actual selection from the GenericSelector's list
  const handleMethodSelect = (id: string) => {
    setSelectedBank(id); // Update context with the selected method ID
    setBankDrawerOpen(false); // Close the drawer
  };

  // Helper to get the right icon based on category or logo
  const getMethodIcon = (method: PaymentMethodOption) => {
    if (method.logo) {
      return (
        <Image
          src={method.logo}
          alt={method.name}
          width={16}
          height={16}
          className='object-contain'
        />
      );
    }
    switch (method.category) {
      case "mobileMoney":
        return <Smartphone className='size-4' />;
      case "wallet":
        return <Wallet className='size-4' />;
      case "bank":
      default:
        return <Building className='size-4' />;
    }
  };

  // Renders a single option inside the GenericSelector's drawer/sheet
  const renderMethodOption = (
    method: PaymentMethodOption,
    isSelected: boolean
  ) => (
    <div className='flex items-center gap-3 flex-1'>
      <div className='w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 overflow-hidden'>
        {getMethodIcon(method)}
      </div>
      <div>
        <div className='text-gray-800 font-medium'>{method.name}</div>
        <div className='text-gray-500 text-xs'>{method.description}</div>
      </div>
    </div>
  );

  return (
    <>
      {/* Category Selector Dropdown */}
      <Select
        value={selectedCategory}
        onValueChange={(value) =>
          handleCategoryChange(value as PaymentMethodOption["category"])
        }>
        <SelectTrigger className='w-full bg-gray-50 border-gray-200 text-gray-600'>
          <SelectValue placeholder='Select Payment Category...' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='bank'>Banks</SelectItem>
          <SelectItem value='mobileMoney'>Mobile Money</SelectItem>
          <SelectItem value='wallet'>Wallets</SelectItem>
        </SelectContent>
      </Select>

      {/* Display Selected Method (only if one is selected) */}
      {selectedOption && (
        <div className='mt-2'>
          {" "}
          {/* Removed min-h */}
          <div className='flex items-center gap-2 rounded-lg border border-gray-200 bg-emerald-50 p-3 text-gray-800 shadow-sm'>
            <div className='w-8 h-8 rounded-full flex items-center justify-center bg-white overflow-hidden border border-gray-200'>
              {getMethodIcon(selectedOption)}
            </div>
            <div className='flex-1 text-left'>
              <div className='text-sm font-medium text-gray-900'>
                {selectedOption.name}
              </div>
              <div className='text-xs text-gray-600'>
                {selectedOption.description}
              </div>
            </div>
            <Check className='h-5 w-5 text-primary' /> {/* Add checkmark */}
          </div>
        </div>
      )}
      {/* No placeholder needed now */}

      {/* Generic Selector (Drawer/Sheet) */}
      <GenericSelector<PaymentMethodOption>
        label={`Select ${
          selectedCategory
            ? selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1)
            : "Method"
        }`}
        options={filteredOptions} // Pass filtered options based on selected category
        selectedId={selectedBank}
        onSelect={handleMethodSelect} // Use the specific handler for method selection
        showDrawer={bankDrawerOpen}
        setShowDrawer={setBankDrawerOpen}
        renderOption={renderMethodOption}
        // renderTrigger is not needed as it's handled externally
      />
    </>
  );
};
