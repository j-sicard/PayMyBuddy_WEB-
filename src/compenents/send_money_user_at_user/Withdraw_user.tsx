import React, { ChangeEvent, FormEvent } from "react";
import Friends, { Friend } from "./FriendList";

interface WithdrawState {
  selectedFriendId: number | null;
  withdrawalAmount: number | null;
  withdrawalResult: string | null;
  description: string;
  userId: number | null;
}

class Withdraw extends React.Component<{}, WithdrawState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedFriendId: null,
      withdrawalAmount: null,
      withdrawalResult: null,
      description: "",
      userId: null,
    };
  }

  componentDidMount() {
    // Récupérer l'userId depuis le localStorage lors du montage du composant
    const userIdString = localStorage.getItem("userId");
    const userId = userIdString ? parseInt(userIdString, 10) : null;
    this.setState({ userId });
  }

  handleFriendChange = (selectedFriend: Friend | null) => {
    this.setState({
      selectedFriendId: selectedFriend ? selectedFriend.id : null,
    });
  };

  handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const withdrawalAmount = Number(event.target.value);
    this.setState({
      withdrawalAmount: isNaN(withdrawalAmount) ? null : withdrawalAmount,
    });
  };

  handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ description: event.target.value });
  };

  withdraw = async (event: FormEvent) => {
    event.preventDefault();

    const { selectedFriendId, withdrawalAmount, description, userId } =
      this.state;

    if (
      !selectedFriendId ||
      withdrawalAmount === null ||
      isNaN(withdrawalAmount)
    ) {
      alert("Veuillez sélectionner un ami et spécifier un montant valide.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/transfers/paymybuddy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderID: userId,
            receiverID: selectedFriendId,
            amount: withdrawalAmount,
            description: description || "",
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.text();
        console.log("Réponse du serveur :", responseData);
        this.setState({ withdrawalResult: responseData });

        // Recharge la page après une opération réussie
        window.location.reload();
      } else {
        const responseData = await response.text();
        console.error("Erreur lors du transfert d'argent :", responseData);
        this.setState({
          withdrawalResult: `Erreur lors du transfert d'argent: ${responseData}`,
        });
      }
    } catch (error: unknown) {
      console.error("Erreur lors du transfert d'argent :", error);

      if (error instanceof Error) {
        this.setState({
          withdrawalResult: `
          Erreur lors du transfert d'argent : ${error.message}`,
        });
      } else {
        this.setState({
          withdrawalResult: "Erreur inconnue lors du transfert d'argent.",
        });
      }
    }
  };

  render() {
    const { withdrawalResult, withdrawalAmount, description, userId } =
      this.state;

    // Si userId n'est pas encore récupéré, afficher un message ou une logique alternative
    if (userId === null) {
      return <p>Utilisateur non connecté.</p>;
    }

    return (
      <div className="bg-gray-200 p-4 w-full relative">
        <form onSubmit={this.withdraw} className="flex items-center w-full">
          <Friends
            userId={userId}
            onChange={this.handleFriendChange}
            selectedFriendId={this.state.selectedFriendId}
          />
          <div>
            <label className="mx-auto" htmlFor="amount"></label>
            <input
              className="border border-black w-24"
              type="text"
              id="amount"
              name="amount"
              value={withdrawalAmount !== null ? withdrawalAmount : ""}
              onChange={this.handleAmountChange}
            />
          </div>

          <button
            type="submit"
            className="w-1/6 bg-green-500 text-white mx-auto rounded-md"
          >
            Payer
          </button>
          <div className="description absolute top-12 left-36">
            {withdrawalResult && <p>{withdrawalResult}</p>}
            {this.state.selectedFriendId !== null && (
              <div>
                <label className="mx-auto" htmlFor="description"></label>
                <input
                  className="border border-black w-64"
                  type="text"
                  id="description"
                  name="description"
                  value={description}
                  onChange={this.handleDescriptionChange}
                  placeholder="Description"
                />
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default Withdraw;
