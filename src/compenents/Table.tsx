import React, { useEffect, useState } from "react";
import { Table, Pagination } from "flowbite-react";

interface Transfer {
  id: number;
  receiverFirstName: string;
  description: string;
  amount: number;
}

// Composant de l'historique des transferts
export default function TransferHistoryTable() {
  // Récupérer userID depuis le stockage local
  const storedUserId = localStorage.getItem("userId");

  // Utiliser l'userID récupéré ou définir une valeur par défaut
  const userID = storedUserId;

  // État pour stocker les transferts récupérés
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  // État pour gérer la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const transfersPerPage = 5;

  // Appeler useEffect sans condition, car on veut toujours récupérer l'historique des transferts
  useEffect(() => {
    fetch(`http://localhost:8080/transfers/history/${userID}`)
      .then((response) => response.json())
      .then((data) => setTransfers(data.reverse()))
      .catch((error) =>
        console.error("Error fetching transfer history:", error)
      );
  }, [userID]);

  // Index du dernier transfert de la page actuelle
  const indexOfLastTransfer = currentPage * transfersPerPage;
  // Index du premier transfert de la page actuelle
  const indexOfFirstTransfer = indexOfLastTransfer - transfersPerPage;
  // Transferts à afficher sur la page actuelle
  const currentTransfers = transfers.slice(
    indexOfFirstTransfer,
    indexOfLastTransfer
  );

  // Fonction de changement de page
  const onPageChange = (page: number) => setCurrentPage(page);

  // Rendu du composant
  return (
    <div>
      <Table striped style={{ borderRadius: 0 }}>
        <Table.Head>
          <Table.HeadCell className="bg-green-400">Connections</Table.HeadCell>
          <Table.HeadCell className="bg-green-400">Description</Table.HeadCell>
          <Table.HeadCell className="bg-green-400">Amount</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentTransfers.map((transfer) => (
            <Table.Row
              key={transfer.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {transfer.receiverFirstName}
              </Table.Cell>
              <Table.Cell>{transfer.description}</Table.Cell>
              <Table.Cell>{transfer.amount}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {/* Pagination avec la classe pour centrer */}
      <Pagination
        className="mt-4"
        style={{ display: "flex", justifyContent: "center" }}
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={Math.ceil(transfers.length / transfersPerPage)}
        previousLabel="<<"
        nextLabel=">>"
      />
    </div>
  );
}
