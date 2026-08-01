import time
print("===== Expense Tracker =====")
print("1. Add Expense")
print("2. View Expenses")
print("3. Total Spent")
print("4. Exit")
choice = input("Enter your choice: ")

if choice=='1':
    category=input("Enter expense category: ")
    amount=float(input("Enter expense amount: "))
    date= time.strftime("%Y-%m-%d", time.localtime())
    print("category: ", category)
    print("amount: ", amount)
    with open("expenses.txt", "a") as f:
        f.write(f"{date}|{category}|{amount}\n")
    f.close()    

if choice=='2':
   with open("expenses.txt","r") as f:
    category_total = {}
    for line in f.readlines():
        category = line.split("|")[1]
        amount = float(line.split("|")[2])
        if category in category_total:
            category_total[category] += amount
        else:
            category_total[category] = amount
    for category in category_total:
        print(category, ":", category_total[category])
    f.close()

if choice=='3':
    total=0
    with open("expenses.txt",'r') as f:
        for cost in f.readlines():  
            total+=float(cost.split('|')[2])
    print("Total spent: ", total)
    f.close()

if choice=='4':
    print("Exiting the program.")
    exit()