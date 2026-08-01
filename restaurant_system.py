#restaurant_management_system
menu={"pizza": 250, "burger": 150, "pasta": 200, "sandwich": 100, "javachip_frappe": 180}
your_menu=[]
total=0
def order_food():
    global total
    print("Welcome to our restaurant!")
    print("please order your food from the menu below:")
    for i in menu:
        print(i, ":", menu[i])
    enter_item=input("Enter the item you want to order: ").lower()
    enter_quantity=int(input("Enter the quantity: "))
    if enter_item in menu.keys():
        your_menu.append(enter_item)
        total+=menu[enter_item]*enter_quantity
        print("your order has been added to the cart!")
        print("do you want to order anything else? (yes/no)")
        choice=input().lower()   
        if choice=="yes":
            order_food()  
        else:
            print("your order has been placed successfully!")
            print("Your Order")
            for item in your_menu:
                print("-", item,"x",enter_quantity)
            print("your total bill is:", total)
            if total>500:
                print("you are eligible for a discount of 10%")
                discount=total*0.1
                total=total-discount
                print("your total bill after discount is:" \
                "thank you for coming--- visit again!", total)
    else:
        print("Item not available.")            
order_food()

           