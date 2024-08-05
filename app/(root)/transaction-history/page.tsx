import HeaderBox from "@/components/HeaderBox";
import { getAccounts, getAccount } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";
import page from "../page";
import { formatAmount } from "@/lib/utils";
import TransactionTable from "@/components/TransactionTable";
import { Pagination } from "@/components/Pagination";

const TransactionnHistory = async ({ searchParams: { page , id } }: {searchParams: { page: string, id: string} }) => {

  const currentPage = Number(page as string) || 1
  const loggedInUser = await getLoggedInUser();

  const accounts = await getAccounts({ userId: loggedInUser?.$id });

  if (!accounts) return;

  const accountData = accounts?.data;

  const appwriteItemId = (id as string) || accountData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });
  const rowsPerPage = 10;
  const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);

  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = account?.transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  return (
    <div className=" transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="see your bank details and transaction"
        />
      </div>
      <div className=" space-y-6">
        <div className=" transactions-account">
          <div className=" flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">
              {account?.data.name}
            </h2>
            <p className=" text-14 text-blue-25">
              {account?.data.officialName}
            </p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● <span className="text-16">1234</span>
            </p>
          </div>
          <div className=" transactions-account-balance">
            <p className=" text-14">Current Balance</p>
            <p className=" text-center text-24 font-bold">
              {formatAmount(account?.data.availableBalance)}
            </p>
          </div>
        </div>
        <section className=" flex w-full flex-col gap-6">
          <TransactionTable transactions={currentTransactions}  />

          {totalPages > 1 && (
            <div className=" my-4 w-full">
              <Pagination totalPages={totalPages} page={currentPage} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TransactionnHistory;
