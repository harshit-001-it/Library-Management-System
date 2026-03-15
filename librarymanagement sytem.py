#######################################################################################################################################



  ######                                              LIBRARY MANAGEMENT SYSTEM                                                ######




import mysql.connector as a     
con=a.connect(host="localhost",user="root",passwd="")

mycursor=con.cursor()
mycursor.execute("create database Libraryms")
mycursor.execute("use libraryms")
mycursor.execute("create table books(B_Name varchar(50), B_Code varchar(30) Primary key, Author_of_book varchar(50), No_of_Books int, Price_of_book int)")
mycursor.execute("create table issue(Name_of_Student varchar(50), Reg_No varchar(30), B_Code varchar(30) Primary key, Issue_Date date)")
mycursor.execute("create table submit(Name_of_Student varchar(50), Reg_No varchar(30), B_Code varchar(30) Primary key, Submit_Date date, Late_Fee int)")

def addbook():
        bn = input("Enter book name : ")
        c = input("Enter book code : ")
        t = input("Enter Author_of_book  : ")
        s = input("Enter Total books : ")
        p=input('Enter the price of the book: ')
        data = (bn,c,t,s,p)
        sql = 'insert into books values(%s,%s,%s,%s,%s)'
        c = con.cursor()
        c.execute(sql,data)
        con.commit()
        print(">----------------------------------------------------------------------------------------<")
        print("Entries Updated Successfully")
        main()
    
def issueb():
        n = input("Enter Name of student : ")
        r = input("Enter Reg No : ")
        co = input("Enter Book Code : ")
        d = input("Enter Date : ")
        a = "insert into issue values(%s,%s,%s,%s)"
        data = (n,r,co,d)
        c = con.cursor()
        c.execute(a,data)
        con.commit()
        print(">--------------------------------------------------------------------------------------------<")
        print("Book issued to : ",n,'successfully')
        bookup(co,-1)
    
def submitb():
        n = input("Enter Name of student : ")
        r = input("Enter Reg No : ")
        co = input("Enter Book Code : ")
        d = input("Enter Date : ")
        a = "insert into submit values(%s,%s,%s,%s)"
        data = (n,r,co,d)
        c = con.cursor()
        c.execute(a,data)
        con.commit()
        print(">--------------------------------------------------------------------------------------------<")
        print("Book Submitted from : ",n,'successfully')
        bookup(co,1)

def bookup(co,u):
        a = "select TOTAL from books where B_Code = %s"
        data = (co,)
        c = con.cursor()
        c.execute(a,data)   
        myresult = c.fetchone()
        t = myresult[0] + u
        sql = "update books set TOTAL = %s where B_Code = %s"
        d = (t,co)
        c.execute(sql,d)
        con.commit()
        main()

def rbook():
        ac = input("Enter Book Code : ")
        a = "delete from books where B_Code = %s"
        data = (ac,)
        c = con.cursor()
        c.execute(a,data)
        con.commit()
        print('Entry deleted successfully')
        main()
    
def dispbook():
        a = "select * from books"
        c = con.cursor()
        c.execute(a)
        myresult = c.fetchall()                    
        for i in myresult:    
            print("Book Name : ",i[0])
            print("Book Code : ",i[1])
            print("Author Name: ",i[2])
            print("Total No of Books: ",i[3])
            print("Price of Book: ",i[4])
            print(">--------------------------------<")
        main()

def ibooks():
        a = "select * from issue"
        c = con.cursor()
        c.execute(a)
        myresult = c.fetchall()                    
        for i in myresult:    
            print("Student Name : ",i[0])
            print("Reg No : ",i[1])
            print("Book Code : ",i[2])
            print("Issue Date : ",i[3])
            print(">--------------------------------<")
        main()
        
def main():
    print("""
                                                    LIBRARY MANAGER
                                              BUILT BY ABHINAV AND HARSHIT          
                                                       
                     1. ADD
                     2. ISSUE
                     3. SUBMIT
                     4. REMOVE
                     5. DISPLAY
                     6. EXIT
    """)
    choice = input("Enter Task No : ")
    print(">--------------------------------------------------------------------------------------------<")
    if (choice == '1'): 
        addbook()
    elif (choice=='2'): 
        issueb() 
    elif (choice=='3'): 
        submitb() 
    elif (choice=='4'): 
        rbook()
    elif (choice=='5'):
        print("1. All   2. Issued")
        ch = input("Enter Task No. ")
        print(">--------------------------------------------------------------------------------------------<")
        if ch == '1':
                dispbook()
        else:
                ibooks()
    elif (choice=='6'): 
        exit() 
    else : 
        print(" Wrong choice..........")
        main()
        
def paswd():
        ps = input("Enter Password : ")
        if ps == "sql":
                main()
        else:
                print("Wrong Password")
                paswd()
paswd()




#######                                                           THANK YOU                                                      ######
