def new_person():
    return {
        "location": None,
        "saw": [],
        "wasSeen": False,
        "saidWasAlone": False
    }

sentence = []
people = {}

# Avaliação das pessoas
n = int(input())
for i in range(n):
    line = input()
    sentence.append(line)
    words = line.split(" ")

    narrator = words[0].replace(":", "")
    location = words[5].replace(",", "")

    if narrator not in people:
        people[narrator] = new_person()

    other_people = range(7, len(words), 2)
    
    people[narrator]["location"] = location
    people[narrator]["saidWasAlone"] = len(other_people) == 0

    for i in other_people:
        person = words[i].replace(".", "")
        people[person] = {
            **people.get(person, new_person()),
            "wasSeen": True
        }
        people[narrator]["saw"].append(person)


# Levantamento de inconsistências
killer = None
notSeenPeople = filter(lambda n: not people[n]["wasSeen"], people)
for n in notSeenPeople:
    person = people[n]
    if len(person["saw"]) > 0:
        killer = n
        break

    hasPersonSameLocation = any([p for p in people.values() if p != person and p["location"] == person["location"]])
    if person["saidWasAlone"] and hasPersonSameLocation:
        killer = n
        break

if killer is not None:
    print(killer, "did it!")
else:   
    print("It was me!")
