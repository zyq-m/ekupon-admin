import { NavLink } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import AddCardRoundedIcon from "@mui/icons-material/AddCardRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";

const nav = [
  {
    id: 1,
    name: "Dashboard",
    link: "/ekupon-admin/dashboard",
    icon: () => <HomeRoundedIcon fontSize="small" />,
  },
  {
    id: 2,
    name: "Registration",
    icon: () => <PersonAddAltRoundedIcon fontSize="small" />,
    child: [
      {
        id: 1.2,
        name: "Cafe",
        link: "/ekupon-admin/register/cafe",
      },
      {
        id: 1.3,
        name: "Student",
        link: "/ekupon-admin/register/student",
      },
    ],
  },
  {
    id: 2,
    name: "user data",
    icon: () => <PeopleAltRoundedIcon fontSize="small" />,
    child: [
      {
        id: 1.2,
        name: "Cafe",
        link: "/ekupon-admin/data/cafe",
      },
      {
        id: 1.3,
        name: "Student",
        link: "/ekupon-admin/data/student",
      },
    ],
  },
  {
    id: 3,
    name: "Top up",
    link: "/ekupon-admin/top-up-wallet",
    icon: () => <AddCardRoundedIcon fontSize="small" />,
  },
  {
    id: 4,
    name: "Transaction",
    link: "/ekupon-admin/transaction/cafe/all",
    icon: () => <ChecklistRoundedIcon fontSize="small" />,
  },
  {
    id: 5,
    name: "spend limit",
    link: "/ekupon-admin/spend-limit",
    icon: () => <PaidRoundedIcon fontSize="small" />,
  },
];

export default function Sidebar() {
  const activeLink = "flex gap-2 items-center px-3 py-2 rounded-lg capitalize";

  return (
    <>
      <nav
        className="flex flex-col justify-between w-[169px]"
        style={{ minHeight: "calc(100vh - 4rem)" }}
      >
        <ul>
          {nav.map((d) => {
            return (
              <>
                <li key={d.id}>
                  {d.link ? (
                    <NavLink
                      to={d.link}
                      className={({ isActive }) =>
                        isActive
                          ? `${activeLink} bg-stone-700 text-white`
                          : `${activeLink} hover:bg-gray-100`
                      }
                    >
                      {d.icon()}
                      {d.name}
                    </NavLink>
                  ) : (
                    <div className={`${activeLink}`}>
                      {d.icon()}
                      {d.name}
                    </div>
                  )}
                  {d.child && (
                    <>
                      <ul className="ml-3">
                        {d.child?.map((e) => {
                          return (
                            <>
                              <li key={e.id} className="ml-5 capitalize">
                                <NavLink
                                  to={e.link}
                                  className={({ isActive }) =>
                                    isActive
                                      ? `${activeLink} bg-stone-700 text-white`
                                      : `${activeLink} hover:bg-gray-100`
                                  }
                                >
                                  {e.name}
                                </NavLink>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </>
                  )}
                </li>
              </>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
