import mysql.connector as a
con=a.connect(host= 'localhost',user='root', passwd='sqlfluid', database='lms')
cursor=con.cursor()
while True:
    b_name= input('enter the book name: ')
    b_code=int(input('enter the book code: '))
    qty= int(input('enter the quantity of books: '))
    price= int(input('enter the price of book: '))
    t= 'insert into book values("{}",{},{},{})'.format(b_name, b_code, qty, price)
    cursor.execute(t)
    con.commit()
    print('data inserted')
    choice=int(input('1>enter more\n 2>exit\n enter the choice:'))
    if choice==2:
        break
    
    
