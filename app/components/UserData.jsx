import React from "react";

const UserData = ({ users }) => {
  const userData = Object.entries(users);
  let total = 0;

  userData.forEach(([userName, choices]) => {
    Object.values(choices).forEach((count) => {
      total += count;
    });
  });

  return (
    <div className="border-2 border-foreground shadow-lg rounded-lg p-4 lg:w-1/4">
      <p className="mb-2">
        <b>Total: </b>
        {total}
      </p>
      <h3 className="font-bold mb-2">Participantes</h3>
      {userData.map(([userName, choices]) => (
        <div className="mb-3" key={userName}>
          <h2 className="border-b-2 border-foreground font-semibold">
            {userName}
          </h2>
          <ul>
            {Object.entries(choices).map(
              ([flavor, count]) =>
                count > 0 && (
                  <li className="my-0.5" key={flavor}>
                    {flavor}: {count}
                  </li>
                )
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default UserData;
