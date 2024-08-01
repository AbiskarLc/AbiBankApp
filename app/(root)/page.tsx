import HeaderBox from "@/components/HeaderBox";
import RightSideBar from "@/components/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const Home = async () => {
  const loggedInUser = await getLoggedInUser();

  console.log(loggedInUser);
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedInUser?.name || "Guest"}
            subtext="Access and manage your account and transaction Efficiently"
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1280.89}
          />
        </header>
      </div>
      <RightSideBar
        user={loggedInUser}
        transactions={[]}
        banks={[{ currentBalance: 1232.05 }, { currentBalance: 2502 }]}
      />
    </section>
  );
};

export default Home;
