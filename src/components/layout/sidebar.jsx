import { NavLink } from "react-router-dom";

const nav = [
  {
    id: 1,
    name: "Dashboard",
    link: "/",
  },
  {
    id: 2,
    name: "Registration",
    child: [
      {
        id: 1.2,
        name: "Cafe",
        link: "/register/cafe",
      },
      {
        id: 1.3,
        name: "Student",
        link: "/register/student",
      },
    ],
  },
  {
    id: 2,
    name: "user data",
    child: [
      {
        id: 1.2,
        name: "Cafe",
        link: "/data/cafe",
      },
      {
        id: 1.3,
        name: "Student",
        link: "/data/student",
      },
    ],
  },
  {
    id: 3,
    name: "Top up wallet",
    link: "/top-up-wallet",
  },
  {
    id: 4,
    name: "Transaction",
    link: "/transaction/cafe/all",
  },
  {
    id: 5,
    name: "spend limit",
    link: "/spend-limit",
  },
];

export default function Sidebar() {
  const activeLink = "block px-3 py-2 rounded-md w-fit capitalize";

  return (
    <>
      <nav className="w-[169px] h-screen">
        <ul className="text-sm">
          {nav.map((d) => {
            return (
              <>
                <li key={d.id}>
                  {d.link ? (
                    <NavLink
                      to={d.link}
                      className={({ isActive }) =>
                        isActive ? `${activeLink} bg-gray-100` : activeLink
                      }
                    >
                      {d.name}
                    </NavLink>
                  ) : (
                    <div className={`${activeLink}`}>{d.name}</div>
                  )}
                  {d.child && (
                    <>
                      <ul className="ml-3 gap-1 hidden hover:grid">
                        {d.child?.map((e) => {
                          return (
                            <>
                              <li key={e.id} className="capitalize">
                                <NavLink
                                  to={e.link}
                                  className={({ isActive }) =>
                                    isActive ? "" : ""
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
        <button className="btn btn-sm btn-error">Logout</button>
      </nav>
    </>
  );
}
