# READING DATA #
Model.query.all() # Get all
Model.query.filter_by(col1="val1", col2="val2").first() # First row that fits condition
Model.query.filter_by(col1="val1", col2="val2").all() # All rows that fit condition
Model.query.filter(Model.col.endswith('val')).all() # All that end with `val`
Model.query.order_by(Model.col).all() # All ordered by column col
schema_instance = Schema_Name(many=True or False) # True if you epect an array of rows, False if you expect only 1 row.
output = schema_instance.dump(data) # output = instance of dict with "data" members
# INSERTING DATA #
row = Modle("col1val", "col2val", "col3val"..."colNval") # Declaring model (edgy af)
row = Modle(col1 = "val1", col2 = "val2", col3 = "val3", ... colN = "valN") # Declaring model (beta af)
db.session.add(row) # Call add method and pass in the row
db.session.commit() # Commit changes
# DELETING DATA #
row = Modle(col1 = "val1", col2 = "val2", col3 = "val3", ... colN = "valN") # Declare row you want to delete OR...
row = Model.query.filter_by(col1="val1", col2="val2").first() # ... OR Query the row you want to delete
db.session.delete(row) # Call delete method and pass in the row
db.session.commit() # Commit changes
# UPDATING DATA #
row = Model.query.filter_by(col1="val1", col2="val2").first() # Query the row you want to change
row.col1 = "_val1_" # Direct changes to the row
db.session.commit() # Commit changes