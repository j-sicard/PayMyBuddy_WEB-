import React, { ChangeEvent, FormEvent } from "react";
import BankAccounts from "./BankAccount";

interface WithdrawState {
  selectedAccountId: number | null;
  withdrawalAmount: number | null;
  withdrawalResult: string | null;
}

class Withdraw extends React.Component<{}, WithdrawState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedAccountId: null,
      withdrawalAmount: null,
      withdrawalResult: null,
    };
  }

  handleAccountChange = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedAccountId: parseInt(event.target.value, 10) });
  };

  handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ withdrawalAmount: Number(event.target.value) });
  };

  withdraw = async (event: FormEvent) => {
    event.preventDefault();

    const { selectedAccountId, withdrawalAmount } = this.state;

    if (!selectedAccountId || !withdrawalAmount) {
      alert("Please select an account and specify an amount.");
      return;
    }

    try {
      // Récupérer userId depuis le stockage local
      const userId = localStorage.getItem("userId");

      const response = await fetch("http://localhost:8080/accounts/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId, // Utiliser le userId récupéré du stockage local
          amount: withdrawalAmount,
          bankAccountId: selectedAccountId,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Account credited!", responseData);
        this.setState({ withdrawalResult: "Account credited!" });

        // Recharge la page après une opération réussie
        window.location.reload();
      } else {
        const responseData = await response.json();
        console.error("Error during withdrawal:", responseData.error);
        this.setState({
          withdrawalResult: `Error during withdrawal: ${responseData.error}`,
        });
      }
    } catch (error: unknown) {
      console.error("Error during withdrawal:", error);

      this.setState({
        withdrawalResult: `Error during withdrawal: ${
          typeof error === "string" ? error : "unknown error"
        }`,
      });
    }
  };

  render() {
    const { withdrawalResult, withdrawalAmount } = this.state;

    return (
      <div className="bg-gray-200" style={{ padding: "20px 0 20px 20px" }}>
        <h3 className="mb-5">Créditez votre compte Pay buddy</h3>
        <form onSubmit={this.withdraw}>
          <BankAccounts onChange={this.handleAccountChange} />
          <div>
            <label className="mr-2" htmlFor="amount">
              Montant à retirer :
            </label>
            <input
              className="border border-black"
              style={{ width: "115px" }}
              type="text"
              id="amount"
              name="amount"
              value={withdrawalAmount || ""}
              onChange={this.handleAmountChange}
            />
          </div>
          <button
            type="submit"
            className="w-2/12 bg-green-500 text-white mt-5"
            style={{ borderRadius: "10px" }}
          >
            Envoyer
          </button>
        </form>
        {withdrawalResult && <p>{withdrawalResult}</p>}
      </div>
    );
  }
}

export default Withdraw;
