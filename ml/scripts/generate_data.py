import pandas as pd
import random

data = []

for _ in range(8000):  # enough data for RF
    user_lifestyle = random.randint(0, 2)
    home_type = random.randint(0, 1)
    experience = random.randint(0, 1)

    pet_energy = random.randint(0, 2)
    pet_size = random.randint(0, 2)
    pet_temperament = random.randint(0, 1)

    score = 0

    # 1. Lifestyle vs Energy (strong relationship)
    diff = abs(user_lifestyle - pet_energy)
    if diff == 0:
        score += 3
    elif diff == 1:
        score += 2
    else:
        score -= 1

    # 2. Home vs Size
    if home_type == 1:  # house
        score += 2
    elif pet_size == 0:  # small pet in apartment
        score += 2
    else:
        score -= 1

    # 3. Experience vs Temperament
    if experience == 1:  # experienced
        score += 2
    elif pet_temperament == 0:  # calm pet
        score += 2
    else:
        score -= 1

    # 4. Slight noise (important)
    score += random.uniform(-0.2, 0.2)

    # Final label
    match = 1 if score >= 3 else 0

    data.append([
        user_lifestyle,
        home_type,
        experience,
        pet_energy,
        pet_size,
        pet_temperament,
        match
    ])

df = pd.DataFrame(data, columns=[
    "user_lifestyle",
    "home_type",
    "experience",
    "pet_energy",
    "pet_size",
    "pet_temperament",
    "match"
])

df.to_csv("../data/dataset.csv", index=False)
print("Dataset generated successfully!")