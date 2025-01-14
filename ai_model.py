import pandas as pd
from sklearn.neighbors import NearestNeighbors

# Example data
data = {
    'destination': ['Beach', 'Mountain', 'City', 'Forest'],
    'budget': [500, 300, 1000, 200],
    'time': [3, 5, 2, 4]
}
df = pd.DataFrame(data)

# Model Training
model = NearestNeighbors(n_neighbors=1)
model.fit(df[['budget', 'time']])

# Function to predict
def recommend(budget, time):
    _, idx = model.kneighbors([[budget, time]])
    return df.iloc[idx[0]]['destination'].values[0]

# Test the model
print(recommend(400, 3))  # Example: Predict for a budget of 400 and time of 3 days
