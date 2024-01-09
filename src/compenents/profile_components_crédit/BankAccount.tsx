import React, { ChangeEvent } from "react";

interface BankAccount {
  id: number;
  name: string;
  balance: number;
}

interface BankAccountsProps {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

interface BankAccountsState {
  bankAccounts: BankAccount[] | null;
  error: string | null;
  loading: boolean;
}

class BankAccounts extends React.Component<
  BankAccountsProps,
  BankAccountsState
> {
  constructor(props: BankAccountsProps) {
    super(props);

    this.state = {
      bankAccounts: null,
      error: null,
      loading: false,
    };
  }

  async loadBankAccounts() {
    this.setState({ error: null, loading: true });

    try {
      // Récupérer userID depuis le stockage local
      const userId = localStorage.getItem("userId");
      // Construire l'URL en utilisant userId
      const url = `http://localhost:8080/accounts/${userId}/banks`;

      const response = await fetch(url);

      if (response.ok) {
        const data: BankAccount[] = await response.json();
        this.setState({ bankAccounts: data });
      } else {
        this.setState({ error: `Erreur: ${response.status}` });
      }
    } catch (error: unknown) {
      this.setState({
        error: `Error while retrieving data: ${
          typeof error === "string" ? error : "unknown error"
        }`,
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    this.loadBankAccounts();
  }

  render() {
    return (
      <div className="mb-5">
        {this.state.error && <p className="text-red-500">{this.state.error}</p>}
        <label className="mr-1" htmlFor="bankAccount">
          Compte bancaire :{" "}
        </label>
        <select
          className="border border-black"
          id="bankAccount"
          onChange={this.props.onChange}
          defaultValue=""
        >
          <option value="" disabled>
            -- Select your bank --
          </option>
          {this.state.bankAccounts?.map((o) => (
            <option key={o.id} value={o.id}>
              {o.id} - {o.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default BankAccounts;
