#######################################################################################################################################



  ######                                              LIBRARY MANAGEMENT SYSTEM                                                ######




import mysql.connector as a     
con = a.connect (host="localhost",user="root",passwd="sql",database="lms")

def addbook():
        bn = input("Enter  BOOK Name : ")
        c = input("Enter BOOK Code : ")
        t = input("Total Books : ")
        s = input("Enter Subject : ")
        data = (bn,c,t,s)
        sql = 'insert into books values(%s,%s,%s,%s)'
        c = con.cursor()
        c.execute(sql,data)
        con.commit()
        print(">----------------------------------------------------------------------------------------<")
        print("Entries Updated Successfully")
        main()
    
def issueb():
        n = input("Enter Name : ")
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
        n = input("Enter Name : ")
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
        a="select TOTAL from books where BCODE = %s"
        data=(co,)
        c=con.cursor()
        c.execute(a,data)   
        myresult=c.fetchone()
        t=myresult[0]+u
        sql="update books set TOTAL = %s where BCODE = %s"
        d=(t,co)
        c.execute(sql,d)
        con.commit()
        main()

def rbook():
        ac = input("Enter Book Code : ")
        a = "delete from books where BCODE = %s"
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
            print("Total : ",i[2])
            print("Subject : ",i[3])
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
