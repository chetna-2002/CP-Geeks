"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      const supabase = createClient();

      try {
        const { data: purchases } = await supabase
          .from("purchases")
          .select("*")
          .order("created_at", { ascending: false });

        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, full_name");

        const { data: courses } = await supabase
          .from("courses")
          .select("id, title");

        const formatted =
          purchases?.map((purchase) => ({
            id: purchase.id,
            user:
              profiles?.find((profile) => profile.id === purchase.user_id)
                ?.full_name || "Unknown User",

            course:
              courses?.find((course) => course.id === purchase.course_id)
                ?.title || "Unknown Course",

            amount: purchase.amount,
            status: purchase.status,
            phonepeTransactionId: purchase.phonepe_transaction_id || "-",

            date: new Date(purchase.created_at).toLocaleDateString("en-IN")
          })) || [];

        setTransactions(formatted);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchPayments();
  }, []);

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.phonepeTransactionId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = transactions
    .filter((tx) => tx.status === "SUCCESS")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const successfulPayments = transactions.filter(
    (tx) => tx.status === "SUCCESS"
  ).length;

  const failedPayments = transactions.filter(
    (tx) => tx.status === "FAILED"
  ).length;

  return (
    <div className="flex-1 space-y-8 p-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-foreground">Payments</h1>
        <p className="text-sm text-foreground/60">
          Manage transactions and revenue
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="border-border/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground/70">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ₹{totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              Successful payments only
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground/70">
              Total Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {transactions.length}
            </div>
            <p className="text-xs text-foreground/60 mt-1">All time</p>
          </CardContent>
        </Card>
        <Card className="border-border/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground/70">
              Successful Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {successfulPayments}
            </div>
            <p className="text-xs text-foreground/60 mt-1">
              Completed Transactions
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground/70">
              Failed Payments
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {failedPayments}
            </div>

            <p className="text-xs text-foreground/60 mt-1">
              Failed transactions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
        <Input
          placeholder="Search transactions..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Transactions Table */}
      <Card className="border-border/30">
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            Total: {filteredTransactions.length} transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/30">
                  <TableHead>User</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>PhonePe Txn ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((tx) => (
                  <TableRow
                    key={tx.id}
                    className="border-border/30 hover:bg-primary/5"
                  >
                    <TableCell className="font-medium text-foreground">
                      {tx.user}
                    </TableCell>
                    <TableCell className="text-foreground/70">
                      {tx.course}
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">
                      &#8377;{tx.amount}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {tx.phonepeTransactionId}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          tx.status === "SUCCESS"
                            ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30"
                            : tx.status === "PENDING"
                              ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/30"
                              : "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30"
                        }
                        variant="outline"
                      >
                        {tx.status === "SUCCESS"
                          ? "Success"
                          : tx.status === "FAILED"
                            ? "Failed"
                            : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground/70">
                      {tx.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
