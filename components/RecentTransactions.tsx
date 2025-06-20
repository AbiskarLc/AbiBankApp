import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "./BankTabItem";
import BankInfo from "./BankInfo";
import TransactionTable from "./TransactionTable";
import { Pagination } from "./Pagination";

const RecentTransactions = ({
  accounts,
  transactions = [],
  page = 1,
  appwriteItemId,
}: RecentTransactionsProps) => {

  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = transactions.slice(
    indexOfFirstTransaction, indexOfLastTransaction
  )
   
  return (
    <section className=" recent-transactions">
      <header className=" flex items-center justify-between">
        <h2 className="recent-transactions-label">Recent Transactions</h2>
        <Link
          href={`/transaction-history/?id=${appwriteItemId}`}
          className=" view-all-btn"
        >
          View all
        </Link>
      </header>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className=" recent-transactions-tablist">
           {
            accounts.map((account) => (
              <TabsTrigger key={account.id} value={account.appwriteItemId}>
                <BankTabItem account={account} appwriteItemId={appwriteItemId}/>
              </TabsTrigger>
            ))
          }
          </TabsList>
           {
            accounts.map((account) => (

              <TabsContent key={account.id} value={account.appwriteItemId} className=" space-y-4">
                      <BankInfo account={account} appwriteItemId={appwriteItemId} type="full"/>
                      <TransactionTable transactions={currentTransactions}/>

                    {
                      totalPages > 1 && (
                        <div className=" my-4 w-full">

                          <Pagination totalPages={totalPages} page={page}/> 
                        </div>
                      )
                    }  
              </TabsContent>
            ))
           }
        
      </Tabs>
    </section>
  );
};

export default RecentTransactions;
