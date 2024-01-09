import React from "react";

export interface Friend {
  id: number;
  firstName: string;
  email: string;
}

interface FriendsProps {
  userId: number; // Ajoutez cette ligne pour déclarer la propriété userId
  onChange: (selectedFriend: Friend | null) => void;
  selectedFriendId: number | null;
}

interface FriendsState {
  friends: Friend[] | null;
  error: string | null;
  loading: boolean;
}

class Friends extends React.Component<FriendsProps, FriendsState> {
  constructor(props: FriendsProps) {
    super(props);

    this.state = {
      friends: null,
      error: null,
      loading: false,
    };
  }

  async loadFriends(userId: number) {
    this.setState({ error: null, loading: true });

    try {
      const response = await fetch(
        `http://localhost:8080/transfers/friend/${userId}`
      );

      if (response.ok) {
        const data: Friend[] = await response.json();
        this.setState({ friends: data });
      } else {
        this.setState({ error: `Erreur: ${response.status}` });
      }
    } catch (error: unknown) {
      this.setState({
        error: `Erreur lors de la récupération des données : ${
          typeof error === "string" ? error : "erreur inconnue"
        }`,
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    // Récupérer userId depuis le stockage local
    const userId = localStorage.getItem("userId");

    if (userId) {
      // Convertir userId en nombre (en supposant que c'est un nombre)
      const userIdNumber = parseInt(userId, 10);
      // Charger les amis en utilisant userId récupéré
      this.loadFriends(userIdNumber);
    } else {
      // Gérer le cas où userId n'est pas disponible dans le stockage local
      console.error("ID utilisateur non trouvé dans le stockage local");
    }
  }

  render() {
    return (
      <div className="mx-auto">
        {this.state.error && <p className="text-red-500">{this.state.error}</p>}
        <label className="mr-1" htmlFor="friend">
          Amis :
        </label>
        <select
          className="border border-black"
          id="friend"
          onChange={(event) => {
            const selectedFriendId = parseInt(event.target.value, 10);
            const selectedFriend =
              this.state.friends?.find(
                (friend) => friend.id === selectedFriendId
              ) || null;
            this.props.onChange(selectedFriend);
          }}
          value={this.props.selectedFriendId || ""}
        >
          <option value="" disabled className="text-center">
            Sélectionner une connexion
          </option>
          {this.state.friends?.map((friend) => (
            <option key={friend.id} value={friend.id}>
              {friend.firstName} - {friend.email}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default Friends;
