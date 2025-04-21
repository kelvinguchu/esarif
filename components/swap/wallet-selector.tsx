"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { PaymentMethodOption } from "@/lib/swap/types";
import { WalletLogo } from "./wallet-logo";
import { GenericSelector } from "./generic-selector";
import { cn } from "@/lib/utils";

interface WalletSelectorProps {
  label: string;
  selected: string;
  onSelect: (value: string) => void;
  type: "from" | "to";
  paymentMethodOptions: PaymentMethodOption[];
  showDrawer: boolean;
  setShowDrawer: (value: boolean) => void;
}

export const WalletSelector = ({
  label,
  selected,
  onSelect,
  type,
  paymentMethodOptions,
  showDrawer,
  setShowDrawer,
}: WalletSelectorProps) => {
  const selectedPaymentMethod = paymentMethodOptions.find(
    (p) => p.id === selected
  );

  // Define how to render a single option in the list
  const renderPaymentMethodOption = (
    option: PaymentMethodOption,
    isSelected: boolean
  ) => (
    <div className='flex items-center gap-3 flex-1'>
      <div
        className='w-10 h-10 rounded-full flex items-center justify-center bg-white overflow-hidden'
        style={{
          boxShadow:
            isSelected && option.color ? `0 0 0 2px ${option.color}` : "none",
        }}>
        <WalletLogo
          wallet={{
            id: option.id,
            name: option.name,
            logo: option.logo,
            color: option.color || "#cccccc",
            isLocalImage: option.category !== "crypto",
            type:
              option.category === "mobileMoney"
                ? "mobile"
                : option.category === "crypto"
                ? "crypto"
                : "mobile",
            description: option.description,
          }}
        />
      </div>
      <div>
        <div className='text-gray-800 font-medium'>{option.name}</div>
        <div className='text-gray-500 text-sm'>{option.description}</div>
      </div>
    </div>
  );

  return (
    <>
      {/* Only show selection UI when we have a selected option or drawer is closed */}
      {(selectedPaymentMethod || !showDrawer) && (
        <>
          {selectedPaymentMethod ? (
            // Render Static Display if an option is selected - but make it clickable
            <div
              onClick={() => setShowDrawer(true)}
              className='flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg p-3 shadow-sm w-full cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-colors'>
              <div
                className='w-10 h-10 rounded-full flex items-center justify-center overflow-hidden'
                style={{}}>
                <WalletLogo
                  wallet={{
                    id: selectedPaymentMethod.id,
                    name: selectedPaymentMethod.name,
                    logo: selectedPaymentMethod.logo,
                    color: selectedPaymentMethod.color ?? "#cccccc",
                    isLocalImage: selectedPaymentMethod.category !== "crypto",
                    type:
                      selectedPaymentMethod.category === "mobileMoney"
                        ? "mobile"
                        : selectedPaymentMethod.category === "crypto"
                        ? "crypto"
                        : "mobile",
                    description: selectedPaymentMethod.description,
                  }}
                />
              </div>
              <div className='flex-1 text-left'>
                <div className='text-gray-800 font-medium'>
                  {selectedPaymentMethod.name}
                </div>
                <div className='text-gray-500 text-xs'>
                  {selectedPaymentMethod.description}
                </div>
              </div>
              <div className='text-gray-400 hover:text-gray-600'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='pencil'>
                  <path d='M12 20h9'></path>
                  <path d='M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z'></path>
                </svg>
              </div>
            </div>
          ) : (
            // Render Trigger Button if NO option is selected and drawer is not open
            <button
              type='button'
              onClick={() => setShowDrawer(true)}
              className={cn(
                "flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg p-3 shadow-sm w-full transition-all hover:border-primary/30 group"
              )}>
              {/* Placeholder Content */}
              <div className='w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-gray-100'>
                {/* Optional: Placeholder Icon */}
              </div>
              <div className='flex-1 text-left'>
                <div className='text-gray-500 font-medium'>Select {label}</div>
                <div className='text-gray-500 text-xs'>Choose from list</div>
              </div>
              <ChevronDown className={cn("h-4 w-4 text-gray-400")} />
            </button>
          )}
        </>
      )}

      {/* Drawer/Sheet component */}
      <GenericSelector<PaymentMethodOption>
        label={`Select ${label}`}
        options={paymentMethodOptions}
        selectedId={selected}
        onSelect={onSelect}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        renderOption={renderPaymentMethodOption}
      />
    </>
  );
};
