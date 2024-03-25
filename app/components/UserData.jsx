import React from "react";

const UserData = ({ users }) => {
  const userData = Object.entries(users);
  console.log(userData);
  return (
    <div className="border-2 border-white rounded-md p-4 md:w-1/4">
      <h3 className="font-bold mb-2">Participantes</h3>
      {userData.map(([userName, choices]) => (
        <div className="mb-2" key={userName}>
          <h2 className="border-b-2 border-white font-semibold">{userName}</h2>
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
