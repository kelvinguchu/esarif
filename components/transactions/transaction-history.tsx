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

interface Transaction {
  id: string;
  date: string;
  type: "swap" | "buy" | "sell" | "transfer";
  amount: string;
  fromWallet: string;
  toWallet: string;
  status: "completed" | "pending" | "failed";
}

export const TransactionHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Mock transactions data
  const [transactions] = useState<Transaction[]>([
    {
      id: "TX123456",
      date: "2023-05-15 14:30",
      type: "swap",
      amount: "500",
      fromWallet: "MPESA",
      toWallet: "BTC",
      status: "completed",
    },
    {
      id: "TX123457",
      date: "2023-05-14 10:15",
      type: "buy",
      amount: "200",
      fromWallet: "USDT",
      toWallet: "BTC",
      status: "completed",
    },
    {
      id: "TX123458",
      date: "2023-05-13 16:45",
      type: "sell",
      amount: "300",
      fromWallet: "ETH",
      toWallet: "USDT",
      status: "pending",
    },
    {
      id: "TX123459",
      date: "2023-05-12 09:20",
      type: "transfer",
      amount: "150",
      fromWallet: "BTC",
      toWallet: "EVC",
      status: "failed",
    },
    {
      id: "TX123460",
      date: "2023-05-11 13:10",
      type: "swap",
      amount: "1000",
      fromWallet: "MPESA",
      toWallet: "ETH",
      status: "completed",
    },
  ]);

  const filteredTransactions = transactions.filter((tx) => {
    if (filter !== "all" && tx.type !== filter) return false;
    if (
      searchQuery &&
      !tx.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !tx.fromWallet.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !tx.toWallet.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const refreshTransactions = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/10";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/10";
      case "failed":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/10";
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

  const toggleRowExpansion = (id: string) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
    }
  };

  return (
    <Card className='border-0 shadow-md bg-transparent rounded-lg overflow-hidden'>
      <CardHeader className='bg-[#ebeffb]/10 px-6 py-4 flex flex-row items-center justify-between'>
        <CardTitle className='text-white text-lg flex items-center gap-2'>
          Transaction History
          <Badge className='ml-2 bg-primary/20 text-primary hover:bg-primary/20'>
            {transactions.length}
          </Badge>
        </CardTitle>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='hidden md:flex items-center gap-1.5 rounded-md border border-white/20 bg-[#ebeffb]/10 hover:bg-[#ebeffb]/20 text-white hover:text-white cursor-pointer'>
            <Download className='h-4 w-4' />
            <span>Export</span>
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='rounded-md border border-white/20 bg-[#ebeffb]/10 hover:bg-[#ebeffb]/20 text-white hover:text-white cursor-pointer'
            onClick={refreshTransactions}
            disabled={isLoading}>
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent className='p-0 bg-transparent'>
        <div className='flex flex-col md:flex-row md:items-center gap-4 p-6 pb-4'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4' />
            <Input
              placeholder='Search transactions...'
              className='pl-10 bg-[#001a38] border-0 text-white rounded-md w-full'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className='flex items-center gap-3'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  size='sm'
                  className='md:hidden items-center gap-1.5 rounded-md border border-white/20 bg-[#001a38] hover:bg-[#001a38]/90 text-white hover:text-white cursor-pointer'>
                  <Filter className='h-4 w-4 mr-1' />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                className='bg-[#001a38] border-white/10 text-white'>
                <DropdownMenuItem
                  onClick={() => setFilter("all")}
                  className='cursor-pointer'>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilter("swap")}
                  className='cursor-pointer'>
                  Swaps
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilter("buy")}
                  className='cursor-pointer'>
                  Buys
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilter("sell")}
                  className='cursor-pointer'>
                  Sells
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilter("transfer")}
                  className='cursor-pointer'>
                  Transfers
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className='hidden md:block'>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className='w-[140px] bg-[#001a38] border-0 text-white rounded-md cursor-pointer'>
                  <SelectValue placeholder='Filter by' />
                </SelectTrigger>
                <SelectContent className='bg-[#001a38] border-white/10 text-white'>
                  <SelectItem value='all'>All</SelectItem>
                  <SelectItem value='swap'>Swaps</SelectItem>
                  <SelectItem value='buy'>Buys</SelectItem>
                  <SelectItem value='sell'>Sells</SelectItem>
                  <SelectItem value='transfer'>Transfers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className='overflow-x-auto hidden md:block'>
          <Table>
            <TableHeader className='bg-[#001a38]'>
              <TableRow className='hover:bg-transparent border-white/10'>
                <TableHead className='text-white font-medium'>Date</TableHead>
                <TableHead className='text-white font-medium'>
                  Transaction ID
                </TableHead>
                <TableHead className='text-white font-medium'>Type</TableHead>
                <TableHead className='text-white font-medium'>From</TableHead>
                <TableHead className='text-white font-medium'>To</TableHead>
                <TableHead className='text-white font-medium'>Amount</TableHead>
                <TableHead className='text-white font-medium text-right'>
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='bg-[#001a38]/50'>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <TableRow
                    key={tx.id}
                    className='hover:bg-[#001a38] border-white/10 cursor-pointer'
                    onClick={() => toggleRowExpansion(tx.id)}>
                    <TableCell className='text-white/70 font-medium'>
                      {tx.date}
                    </TableCell>
                    <TableCell className='text-white/70'>{tx.id}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        {getTypeIcon(tx.type)}
                        <span className='text-white/70 capitalize'>
                          {tx.type}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className='text-white/70'>
                      {tx.fromWallet}
                    </TableCell>
                    <TableCell className='text-white/70'>
                      {tx.toWallet}
                    </TableCell>
                    <TableCell className='text-white/70'>
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
                    className='text-center h-32 text-white/50'>
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile List View */}
        <div className='md:hidden'>
          {filteredTransactions.length > 0 ? (
            <div className='divide-y divide-white/10'>
              {filteredTransactions.map((tx) => (
                <div key={tx.id} className='py-4 px-4'>
                  <div
                    className='flex justify-between items-center cursor-pointer'
                    onClick={() => toggleRowExpansion(tx.id)}>
                    <div className='flex items-center gap-3'>
                      <div className='h-8 w-8 rounded-full bg-[#001a38] flex items-center justify-center'>
                        {getTypeIcon(tx.type)}
                      </div>
                      <div>
                        <div className='text-white font-medium'>
                          ${tx.amount}
                        </div>
                        <div className='text-white/50 text-xs'>{tx.date}</div>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Badge
                        variant='outline'
                        className={`${getStatusColor(
                          tx.status
                        )} capitalize cursor-default`}>
                        {tx.status}
                      </Badge>
                      {expandedRow === tx.id ? (
                        <ChevronUp className='h-4 w-4 text-white/50' />
                      ) : (
                        <ChevronDown className='h-4 w-4 text-white/50' />
                      )}
                    </div>
                  </div>

                  {expandedRow === tx.id && (
                    <div className='mt-4 ml-11 pl-1 border-l-2 border-white/10 space-y-2'>
                      <div className='flex justify-between'>
                        <span className='text-white/50 text-sm'>Type:</span>
                        <span className='text-white text-sm capitalize'>
                          {tx.type}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-white/50 text-sm'>From:</span>
                        <span className='text-white text-sm'>
                          {tx.fromWallet}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-white/50 text-sm'>To:</span>
                        <span className='text-white text-sm'>
                          {tx.toWallet}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-white/50 text-sm'>ID:</span>
                        <span className='text-white text-sm'>{tx.id}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className='py-12 text-center text-white/50'>
              No transactions found
            </div>
          )}
        </div>

        {filteredTransactions.length > 0 && (
          <div className='flex items-center justify-between p-4 border-t border-white/10'>
            <p className='text-white/50 text-sm'>
              Showing {filteredTransactions.length} of {transactions.length}{" "}
              transactions
            </p>
            <Button
              variant='outline'
              size='sm'
              className='border border-white/20 bg-[#001a38] hover:bg-[#001a38]/90 text-white hover:text-white cursor-pointer'>
              Load More
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
