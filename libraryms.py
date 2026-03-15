import mysql.connector as a
con=a.connect(host= 'localhost',user='root', passwd='merijaan', database='lms')

def addbook():
    bn=input("Enter Book Name:- ")
    c=input("Enter Book Code:- ")
    t=input("Total Books:- ")
    s=input("Enter Author Name:- ")
    p=input("Enter the Price of book:- ")
    pb=input("Enter the Publisher of the Book:- ")
    data=(bn,c,t,s,p,pb)
    sql="insert into books values (%s,%s,%s,%s,%s,%s)"
    c=con.cursor()
    c.execute(sql,data)
    con.commit()
    print('**************************************####***********************************************')
    print('Data entered sucessfully')
    main()

def issueb():
    n=input('Enter book name:-')
    r=input('Enter reg no:-')
    co=input('Enter book code:-')
    d=input('Enter date of issue:-')
    a="insert into issue values(%s,%s,%s,%s)"
    data=(n,r,co,d)
    c=con.cursor()
    c.execute(a,data)
    con.commit()
    print(">---------------------------------<>-----------------------------<")
    print("Book issued to:-",n)
    bookup(co,-1)
    main()

def submitb():
    n=input('Enter name:-')
    r=input('Enter reg no:-')
    co=input('Enter book code:-')
    d=input('Enter date of submit:-')
    a="insert into submit values(%s,%s,%s,%s)"
    data=(n,r,co,d)
    c=con.cursor()
    c.execute(a,data)
    con.commit()
    print(">****************************<>**************************<")
    print("Book submitted from:-",n)
    bookup(co,1)
    main()


def bookup(co,u):
    a="select total from books where BCODE=%s"
    data=(co,)
    c=con.cursor()
    c.execute(a,data)
    myresult=c.fetchone()
    t=myresult[0]+u
    sql="update books set total=%s where BCODE=%s"
    d=(t,co)
    c.execute(sql,d)
    con.commit()
    main()

def dbook():
    ac=input('Enter book code:-')
    a='delete from books where BCODE=%s'
    data=(ac,)
    c=con.cursor()
    c.execute(a,data)
    con.commit()
    main()

def dispbook():
    a="select*from books"
    c=con.cursor()
    c.execute(a)
    myresult=c.fetchall()
    for i in myresult:
        print("Book Name:-",i[0])
        print("book code:-",i[1])
        print("total:-",i[2])
        print("Author:-",i[3])
        print("Price of book:- ",i[4])
        print("Publisher of book:- ",i[5])
        print('~~~~~~~~~~~~~~~~~~~~~~~')
    main()

def main():
    print("====================++++++++++==============+++++++++++====================++++++++++============================")
    print("""_________________________________-_________________________________-_______________________-
                                                         LIBRARY MANAGER
          1.ADD BOOK
          2.ISSUE BOOK
          3.RETURN BOOK
          4.DELETE BOOK
          5.DISPLAY BOOKS
          6.EXIT
        """)
    choice=input('ENTER THE NUMBER TO PERFORM TASK FROM OPTIONS GIVEN ABOVE:-')
    print("||||---------------------------------------------------------------------------------------------------||||")
    if(choice=='1'):
        addbook()
    elif(choice=='2'):
        issueb()
    elif(choice=='3'):
        submitb()
    elif(choice=='4'):
        dbook()
    elif(choice=='5'):
        dispbook()
    elif(choice=='6'):
        exit()
    else:
        print('NO CODE')
    main()

def pswd():
  pw= input("Enter password: ")
  if pw=="lms123":
    main()
  else:
    print("Wrong Pasword")
    pswd()
pswd()
  


