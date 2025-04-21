"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowRight,
  RefreshCw,
  Search,
  Download,
  Filter,
  ArrowLeftRight,
  ChevronDown,
  ChevronUp,
  Calendar,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";

interface Transaction {
  id: string;
  date: string;
  type: "swap" | "buy" | "sell" | "transfer";
  amount: string;
  fromWallet: string;
  fromWalletName: string;
  fromCategory: "bank" | "mobileMoney" | "wallet" | "crypto";
  toWallet: string;
  toWalletName: string;
  toCategory: "bank" | "mobileMoney" | "wallet" | "crypto";
  status: "completed" | "pending" | "failed";
  fromAmount?: string;
  toAmount?: string;
  fee?: string;
  rate?: string;
}

export const TransactionHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Mock transactions data with improved details
  const [transactions] = useState<Transaction[]>([
    {
      id: "TX123456",
      date: "2023-09-15T14:30:00",
      type: "swap",
      amount: "500",
      fromWallet: "MPESA",
      fromWalletName: "M-Pesa",
      fromCategory: "mobileMoney",
      toWallet: "USDT-TRC20",
      toWalletName: "USDT (TRC20)",
      toCategory: "crypto",
      status: "completed",
      fromAmount: "500.00",
      toAmount: "3.92",
      fee: "5.00",
      rate: "1 USD = 127.55 KSh",
    },
    {
      id: "TX123457",
      date: "2023-09-14T10:15:00",
      type: "buy",
      amount: "200",
      fromWallet: "Premier-Bank",
      fromWalletName: "Premier Bank",
      fromCategory: "bank",
      toWallet: "USDT-TRC20",
      toWalletName: "USDT (TRC20)",
      toCategory: "crypto",
      status: "completed",
      fromAmount: "200.00",
      toAmount: "199.50",
      fee: "0.50",
      rate: "1 USDT = $1.0001",
    },
    {
      id: "TX123458",
      date: "2023-09-13T16:45:00",
      type: "sell",
      amount: "300",
      fromWallet: "USDT-BEP20",
      fromWalletName: "USDT (BEP20)",
      fromCategory: "crypto",
      toWallet: "EVC",
      toWalletName: "EVC Plus",
      toCategory: "mobileMoney",
      status: "pending",
      fromAmount: "300.00",
      toAmount: "298.50",
      fee: "1.50",
      rate: "1 USDT = $1.00",
    },
    {
      id: "TX123459",
      date: "2023-09-12T09:20:00",
      type: "swap",
      amount: "150",
      fromWallet: "Premier-Bank",
      fromWalletName: "Premier Bank",
      fromCategory: "bank",
      toWallet: "EVC",
      toWalletName: "EVC Plus",
      toCategory: "mobileMoney",
      status: "failed",
      fromAmount: "150.00",
      toAmount: "149.25",
      fee: "0.75",
      rate: "1 USD = $1.00",
    },
    {
      id: "TX123460",
      date: "2023-09-11T13:10:00",
      type: "swap",
      amount: "1000",
      fromWallet: "MPESA",
      fromWalletName: "M-Pesa",
      fromCategory: "mobileMoney",
      toWallet: "dahab-plus",
      toWalletName: "Dahab Plus",
      toCategory: "wallet",
      status: "completed",
      fromAmount: "1000.00",
      toAmount: "995.00",
      fee: "5.00",
      rate: "1 USD = 127.55 KSh",
    },
    {
      id: "TX123461",
      date: "2023-09-10T11:22:00",
      type: "buy",
      amount: "500",
      fromWallet: "Salaam-Bank",
      fromWalletName: "Salaam Bank",
      fromCategory: "bank",
      toWallet: "USDT-TRC20",
      toWalletName: "USDT (TRC20)",
      toCategory: "crypto",
      status: "completed",
      fromAmount: "500.00",
      toAmount: "498.75",
      fee: "1.25",
      rate: "1 USDT = $1.0001",
    },
    {
      id: "TX123462",
      date: "2023-09-09T08:45:00",
      type: "sell",
      amount: "250",
      fromWallet: "USDC-BEP20",
      fromWalletName: "USDC (BEP20)",
      fromCategory: "crypto",
      toWallet: "ZAAD",
      toWalletName: "ZAAD",
      toCategory: "mobileMoney",
      status: "completed",
      fromAmount: "250.00",
      toAmount: "248.75",
      fee: "1.25",
      rate: "1 USDC = $0.9998",
    },
    {
      id: "TX123463",
      date: "2023-09-08T14:15:00",
      type: "swap",
      amount: "350",
      fromWallet: "dahab-plus",
      fromWalletName: "Dahab Plus",
      fromCategory: "wallet",
      toWallet: "ZAAD",
      toWalletName: "ZAAD",
      toCategory: "mobileMoney",
      status: "completed",
      fromAmount: "350.00",
      toAmount: "348.25",
      fee: "1.75",
      rate: "1 USD = $1.00",
    },
  ]);

  // Filter transactions based on type, search query, and date range
  const filteredTransactions = transactions.filter((tx) => {
    // Filter by transaction type
    if (filter !== "all" && tx.type !== filter) return false;

    // Filter by search query
    if (
      searchQuery &&
      !tx.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !tx.fromWalletName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !tx.toWalletName.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    // Filter by date range
    if (dateRange !== "all") {
      const txDate = new Date(tx.date);
      const now = new Date();

      switch (dateRange) {
        case "today":
          if (txDate.toDateString() !== now.toDateString()) return false;
          break;
        case "week":
          const weekAgo = new Date();
          weekAgo.setDate(now.getDate() - 7);
          if (txDate < weekAgo) return false;
          break;
        case "month":
          const monthAgo = new Date();
          monthAgo.setMonth(now.getMonth() - 1);
          if (txDate < monthAgo) return false;
          break;
      }
    }

    return true;
  });

  const refreshTransactions = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMM d, yyyy h:mm a");
    } catch (e) {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 hover:bg-green-100 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-700 hover:bg-red-100 border-red-200";
      default:
        return "";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "swap":
        return <ArrowLeftRight className='h-4 w-4 text-primary' />;
      case "buy":
        return <ArrowDown className='h-4 w-4 text-green-500' />;
      case "sell":
        return <ArrowUp className='h-4 w-4 text-red-500' />;
      case "transfer":
        return <ArrowRight className='h-4 w-4 text-blue-500' />;
      default:
        return <ArrowLeftRight className='h-4 w-4 text-primary' />;
    }
  };

  const getTypeLabel = (
    type: string,
    fromCategory?: string,
    toCategory?: string
  ) => {
    switch (type) {
      case "swap":
        if (fromCategory && toCategory) {
          return `${getCategoryLabel(fromCategory)} to ${getCategoryLabel(
            toCategory
          )} Swap`;
        }
        return "Swap";
      case "buy":
        return "Buy Crypto";
      case "sell":
        return "Sell Crypto";
      case "transfer":
        return "Transfer";
      default:
        return type;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "bank":
        return "Bank";
      case "mobileMoney":
        return "Mobile Money";
      case "wallet":
        return "Wallet";
      case "crypto":
        return "Crypto";
      default:
        return category;
    }
  };

  const toggleRowExpansion = (id: string) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
    }
  };

  return (
    <Card className='border border-gray-200 shadow-md bg-white rounded-lg overflow-hidden'>
      <CardHeader className='bg-gray-50 px-6 py-4 flex flex-row items-center justify-between border-b border-gray-200'>
        <CardTitle className='text-gray-800 text-lg flex items-center gap-2'>
          Transaction History
          <Badge className='ml-2 bg-primary/20 text-primary hover:bg-primary/20'>
            {transactions.length}
          </Badge>
        </CardTitle>
        <div className='flex items-center gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                size='sm'
                className='hidden md:flex items-center gap-1.5 rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 cursor-pointer'>
                <Download className='h-4 w-4' />
                <span>Export</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='bg-white border-gray-200 text-gray-800'>
              <DropdownMenuItem className='cursor-pointer'>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer'>
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer'>
                Export as Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant='outline'
            size='icon'
            className='rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 cursor-pointer'
            onClick={refreshTransactions}
            disabled={isLoading}>
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent className='p-0 bg-white'>
        <div className='flex flex-col md:flex-row md:items-center gap-4 p-6 pb-4'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
            <Input
              placeholder='Search by ID, wallet name...'
              className='pl-10 bg-gray-50 border border-gray-200 text-gray-800 rounded-md w-full'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className='flex items-center gap-3 flex-wrap'>
            <div className='md:block'>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className='w-[140px] bg-gray-50 border border-gray-200 text-gray-800 rounded-md cursor-pointer'>
                  <SelectValue placeholder='Transaction Type' />
                </SelectTrigger>
                <SelectContent className='bg-white border-gray-200 text-gray-800'>
                  <SelectItem value='all'>All Types</SelectItem>
                  <SelectItem value='swap'>Swaps</SelectItem>
                  <SelectItem value='buy'>Buys</SelectItem>
                  <SelectItem value='sell'>Sells</SelectItem>
                  <SelectItem value='transfer'>Transfers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='md:block'>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className='w-[140px] bg-gray-50 border border-gray-200 text-gray-800 rounded-md cursor-pointer'>
                  <SelectValue placeholder='Date Range' />
                </SelectTrigger>
                <SelectContent className='bg-white border-gray-200 text-gray-800'>
                  <SelectItem value='all'>All Time</SelectItem>
                  <SelectItem value='today'>Today</SelectItem>
                  <SelectItem value='week'>Last 7 Days</SelectItem>
                  <SelectItem value='month'>Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className='overflow-x-auto hidden md:block'>
          <Table>
            <TableHeader className='bg-gray-50'>
              <TableRow className='hover:bg-transparent border-gray-200'>
                <TableHead className='text-gray-700 font-medium'>
                  Date
                </TableHead>
                <TableHead className='text-gray-700 font-medium'>
                  Transaction ID
                </TableHead>
                <TableHead className='text-gray-700 font-medium'>
                  Type
                </TableHead>
                <TableHead className='text-gray-700 font-medium'>
                  From
                </TableHead>
                <TableHead className='text-gray-700 font-medium'>To</TableHead>
                <TableHead className='text-gray-700 font-medium text-right'>
                  Amount
                </TableHead>
                <TableHead className='text-gray-700 font-medium text-right'>
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='bg-white'>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <TableRow
                    key={tx.id}
                    className='hover:bg-gray-50 border-gray-200 cursor-pointer'
                    onClick={() => toggleRowExpansion(tx.id)}>
                    <TableCell className='text-gray-600 font-medium'>
                      {formatDate(tx.date)}
                    </TableCell>
                    <TableCell className='text-gray-600 font-mono text-sm'>
                      {tx.id}
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        {getTypeIcon(tx.type)}
                        <span className='text-gray-600'>
                          {getTypeLabel(
                            tx.type,
                            tx.fromCategory,
                            tx.toCategory
                          )}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className='text-gray-600'>
                      {tx.fromWalletName}
                    </TableCell>
                    <TableCell className='text-gray-600'>
                      {tx.toWalletName}
                    </TableCell>
                    <TableCell className='text-right font-medium'>
                      ${tx.amount}
                    </TableCell>
                    <TableCell className='text-right'>
                      <Badge
                        variant='outline'
                        className={`${getStatusColor(
                          tx.status
                        )} capitalize cursor-default`}>
                        {tx.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className='text-center h-32 text-gray-400'>
                    <div className='flex flex-col items-center justify-center gap-2 py-8'>
                      <Info className='h-8 w-8 text-gray-300' />
                      <p>No transactions found</p>
                      <p className='text-sm text-gray-400'>
                        Try adjusting your filters
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile List View */}
        <div className='md:hidden'>
          {filteredTransactions.length > 0 ? (
            <div className='divide-y divide-gray-200'>
              {filteredTransactions.map((tx) => (
                <div key={tx.id} className='py-4 px-4'>
                  <div
                    className='flex justify-between items-start cursor-pointer'
                    onClick={() => toggleRowExpansion(tx.id)}>
                    <div className='flex items-center gap-3'>
                      <div className='h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center'>
                        {getTypeIcon(tx.type)}
                      </div>
                      <div>
                        <div className='text-gray-800 font-medium'>
                          ${tx.amount}
                        </div>
                        <div className='text-gray-600 text-xs'>
                          {getTypeLabel(
                            tx.type,
                            tx.fromCategory,
                            tx.toCategory
                          )}
                        </div>
                        <div className='text-gray-500 text-xs'>
                          {formatDate(tx.date)}
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col items-end gap-1'>
                      <Badge
                        variant='outline'
                        className={`${getStatusColor(
                          tx.status
                        )} capitalize cursor-default`}>
                        {tx.status}
                      </Badge>
                      {expandedRow === tx.id ? (
                        <ChevronUp className='h-4 w-4 text-gray-400 mt-1' />
                      ) : (
                        <ChevronDown className='h-4 w-4 text-gray-400 mt-1' />
                      )}
                    </div>
                  </div>

                  {expandedRow === tx.id && (
                    <div className='mt-4 ml-12 pl-2 border-l-2 border-gray-200 space-y-3'>
                      <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
                        <div>
                          <span className='text-gray-500 text-xs'>From:</span>
                          <div className='text-gray-800 text-sm'>
                            {tx.fromWalletName}
                            <span className='text-xs text-gray-500 ml-1'>
                              ({getCategoryLabel(tx.fromCategory)})
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className='text-gray-500 text-xs'>To:</span>
                          <div className='text-gray-800 text-sm'>
                            {tx.toWalletName}
                            <span className='text-xs text-gray-500 ml-1'>
                              ({getCategoryLabel(tx.toCategory)})
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className='text-gray-500 text-xs'>
                            Amount Sent:
                          </span>
                          <div className='text-gray-800 text-sm'>
                            {tx.fromAmount}
                          </div>
                        </div>
                        <div>
                          <span className='text-gray-500 text-xs'>
                            Amount Received:
                          </span>
                          <div className='text-gray-800 text-sm'>
                            {tx.toAmount}
                          </div>
                        </div>
                        {tx.fee && (
                          <div>
                            <span className='text-gray-500 text-xs'>Fee:</span>
                            <div className='text-gray-800 text-sm'>
                              ${tx.fee}
                            </div>
                          </div>
                        )}
                        {tx.rate && (
                          <div>
                            <span className='text-gray-500 text-xs'>Rate:</span>
                            <div className='text-gray-800 text-sm'>
                              {tx.rate}
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        <span className='text-gray-500 text-xs'>
                          Transaction ID:
                        </span>
                        <div className='text-gray-800 text-sm font-mono'>
                          {tx.id}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className='py-12 flex flex-col items-center justify-center gap-2'>
              <Info className='h-8 w-8 text-gray-300' />
              <p className='text-gray-400'>No transactions found</p>
              <p className='text-sm text-gray-400'>
                Try adjusting your filters
              </p>
            </div>
          )}
        </div>

        {filteredTransactions.length > 0 && (
          <div className='flex items-center justify-between p-4 border-t border-gray-200'>
            <p className='text-gray-500 text-sm'>
              Showing {filteredTransactions.length} of {transactions.length}{" "}
              transactions
            </p>
            <Button
              variant='outline'
              size='sm'
              className='border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 cursor-pointer'>
              Load More
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
