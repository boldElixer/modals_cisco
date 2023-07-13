export const Options = [
    {
      name: "SELECT UserId, Name, Password FROM Users WHERE UserId = 105 or 1=1;"
    },
    {
      name: "SELECT * FROM Users WHERE UserId = 105 OR 1=1;"
    },
    {
        name: 'SELECT * FROM Users WHERE Name ="" or ""="" AND Pass ="" or ""="";'
    },
    {
        name: 'SELECT * FROM Users WHERE UserId = 105; DROP TABLE Suppliers;'
    }
];
  