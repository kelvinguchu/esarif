"use client";

import React from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";

// Define a generic option type
interface GenericOption {
  id: string;
  // Add other common fields if necessary, or rely on render functions
}

interface GenericSelectorProps<T extends GenericOption> {
  label: string; // For Drawer/Sheet title
  options: T[];
  selectedId: string | null | undefined;
  onSelect: (id: string) => void;
  showDrawer: boolean;
  setShowDrawer: (open: boolean) => void;
  renderOption: (option: T, isSelected: boolean) => React.ReactNode;
}

export const GenericSelector = <T extends GenericOption>({
  label,
  options,
  selectedId,
  onSelect,
  showDrawer,
  setShowDrawer,
  renderOption,
}: GenericSelectorProps<T>) => {
  const selectedOption = options.find((option) => option.id === selectedId);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleOpenChange = (open: boolean) => {
    setShowDrawer(open);
  };

  const handleSelect = (id: string) => {
    onSelect(id);
    setShowDrawer(false);
  };

  // Content for the list within Drawer/Sheet
  const content = (
    <div className='p-4 divide-y divide-gray-200'>
      {options.map((option) => (
        <div
          key={option.id}
          className={`flex items-center justify-between py-3 px-3 my-1 rounded-lg cursor-pointer transition-all ${
            option.id === selectedId
              ? "bg-gray-100 shadow-sm"
              : "hover:bg-gray-50"
          }`}
          onClick={() => handleSelect(option.id)}>
          {/* Render option using the provided function */}
          {renderOption(option, option.id === selectedId)}
          {option.id === selectedId && (
            <Check className='h-5 w-5 text-primary' />
          )}
        </div>
      ))}
    </div>
  );

  // Render Drawer/Sheet directly based on showDrawer prop
  if (isMobile) {
    return (
      <Drawer open={showDrawer} onOpenChange={handleOpenChange}>
        <DrawerContent className='bg-white border-t border-gray-200 rounded-t-xl p-0'>
          <DrawerHeader className='bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 p-4 sticky top-0 z-10'>
            <DrawerTitle className='text-gray-800'>{label}</DrawerTitle>
          </DrawerHeader>
          <div className='max-h-[65vh] overflow-y-auto py-2 custom-scrollbar'>
            {content}
          </div>
          <DrawerFooter className='border-t border-gray-200 sticky bottom-0 bg-white z-10'>
            <Button
              variant='outline'
              className='w-full bg-transparent border-gray-200 text-gray-700 hover:bg-gray-50'
              onClick={() => setShowDrawer(false)}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else {
    // For Sheet, we need a way to control its open state without a trigger.
    // We can conditionally render the Sheet based on showDrawer.
    // Or pass the open prop directly if Sheet supports it without Trigger.
    // Let's try conditional rendering for clarity.
    if (!showDrawer) return null; // Don't render Sheet if not open

    return (
      <Sheet open={showDrawer} onOpenChange={handleOpenChange}>
        <SheetContent
          side='right'
          className='w-[400px] bg-white border-l border-gray-200 p-0'>
          <SheetHeader className='bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 p-4 sticky top-0 z-10'>
            <SheetTitle className='text-gray-800'>{label}</SheetTitle>
          </SheetHeader>
          <div className='overflow-y-auto py-2 h-[calc(100vh-80px)] custom-scrollbar'>
            {content}
          </div>
        </SheetContent>
      </Sheet>
    );
  }
};
