import { useState } from "react";
import { FiEdit, FiEyeOff } from "react-icons/fi";
import styles from "./UsersTable.module.css";

interface User {
  id: string | number;
  name: string;
  category: "High School" | "Common Entrance" | "Adult Education";
  exams: string[];
  plan: string;
  paymentStatus: string;
  trialSessions: number;
}

interface UsersTableProps {
  users: User[];
}

export default function UsersTable({ users }: UsersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  // map user type to badge color
  const getCategoryBadge = (category: User["category"]) => {
    switch (category) {
      case "High School":
        return styles.badgeHighSchool;
      case "Common Entrance":
        return styles.badgeCommonEntrance;
      case "Adult Education":
        return styles.badgeAdultEducation;
      default:
        return "";
    }
  };

  return (
    <div className={styles.usersTableWrapper}>
      <table className={styles.usersTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>User Type</th>
            <th>Exam/Program</th>
            <th>Plan</th>
            <th>Payment Status</th>
            <th>Trial Sessions</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id} className={styles.row}>
              <td>{user.name}</td>
              <td>
                <span
                  className={`${styles.badge} ${getCategoryBadge(
                    user.category
                  )}`}
                >
                  {user.category}
                </span>
              </td>
              <td>{user.exams.join(", ")}</td>
              <td>{user.plan}</td>
              <td
                className={`${styles.paymentStatus} ${
                  styles[user.paymentStatus.toLowerCase().replace(" ", "")]
                }`}
              >
                {user.paymentStatus}
              </td>
              <td>{user.trialSessions}/3</td>
              <td className={styles.actionsCell}>
                <button className={styles.iconButton} aria-label="Edit user">
                  <FiEdit size={16} />
                </button>
                <button
                  className={`${styles.iconButton} ${styles.secondButton}`}
                  aria-label="Hide user"
                >
                  <FiEyeOff size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
