import requests

url = "https://dummyjson.com/users"

response = requests.get(url)
data = response.json()

while True:
    print("\n========== BANK EXPLORER ==========")
    print("1. Show all users")
    print("2. Search by username")
    print("3. Filter by currency")
    print("4. Count users by currency")
    print("5. Exit")

    choice = input("Enter your choice: ")

    if choice == "1":
        for i in data["users"]:
            print("-----------------------------")
            print("Name :", i["firstName"])
            print("Username :", i["username"])
            print("Email :", i["email"])
            print("Currency :", i["bank"]["currency"])
            print("Card Number :", i["bank"]["cardNumber"])

    elif choice == "2":
        name = input("Enter username : ")

        found = False

        for i in data["users"]:
            if i["username"].lower() == name.lower():

                print("==========================")
                print("Name :", i["firstName"])
                print("Username :", i["username"])
                print("Email :", i["email"])
                print("Phone :", i["phone"])
                print("Currency :", i["bank"]["currency"])
                print("Card Number :", i["bank"]["cardNumber"])
                print("Company :", i["company"]["name"])

                found = True
                break

        if found == False:
            print("User not found!")

    elif choice == "5":
        print("Thank you for using Bank Explorer!")
        break

    elif choice =="3":
        enter_cur=input("enter your currency:")
        
        for q in data['users']:
            if q['bank']['currency'].lower()==enter_cur.lower():
                print(q["firstName"], q["username"], q["email"], q["bank"]["currency"])
                
    elif choice == "4":
        enter_cur = input("Enter currency: ")
        count = 0

        for q in data["users"]:
            if q["bank"]["currency"].lower() == enter_cur.lower():
                count += 1

        print("Users with", enter_cur.upper(), ":", count)

    elif choice == "5":
        print("Thank you for using Bank Explorer!")
        break

