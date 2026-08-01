from abc import ABC, abstractmethod
class Payment(ABC):
    def __init__(self,balance,card):
        self.balance=balance
        self.card=card
        self.transferred=0

    @abstractmethod
    def pay(self):
        pass

class UPI(Payment):
    def pay(self):
        amount=int(input("enter amount to pay:"))
        self.transferred+=amount
        self.balance-=amount
        print(f"done!- remaining balance= {self.balance}")

class CreditCard(Payment):
    def pay(self):
        card_num = input("enter 16 digit card number: ")
        if card_num==self.card:
            amount=int(input("enter amount to pay:"))
            self.transferred+=amount
            self.balance-=amount
            print(f"done!- remaining balance= {self.balance}")
        else:
            print("try again")
class Cash(Payment):
    def pay(self):
            amount=int(input("enter amount to pay:"))
            self.transferred+=amount
            self.balance-=amount
            print(f"done!- remaining balance= {self.balance}")

payments=input("enter your choice:1/2/3/4-")

upi = UPI(50000, "1234 5678 4321 6543")
cred = CreditCard(50000, "1234 5678 4321 6543")
cas = Cash(50000, "1234 5678 4321 6543")

if payments=="1":
    upi.pay()
elif payments=="2":
    cred.pay()
elif payments=="3":
    cas.pay()
elif payments=="4":
    print("thank you- exit")
else:
    print("try again")





