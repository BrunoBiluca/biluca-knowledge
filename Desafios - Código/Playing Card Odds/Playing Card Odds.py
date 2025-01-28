import sys


def combine_str(str1, str2):
    return [a + b for a in str1 for b in str2]


def split_card_sets(descriptive):
    card_sets = []
    card_set = {"cards": "", "suits": ""}

    set_delimiter_defined = False
    for c in descriptive:
        if c in available_cards:
            if set_delimiter_defined:
                card_sets.append(card_set)
                card_set = {"cards": "", "suits": ""}
                set_delimiter_defined = False

            card_set["cards"] += c
        elif c in available_suits:
            set_delimiter_defined = True
            card_set["suits"] += c
    else:
        card_sets.append(card_set)

    for s in card_sets:
        if s["cards"] == "":
            s["cards"] = available_cards

        if s["suits"] == "":
            s["suits"] = available_suits
        

    return card_sets


# Criação do baralho
available_cards = "23456789TJQKA"
available_suits = "CDHS"
deck = combine_str(available_cards, available_suits)

# Leitura da entrada
r, s = [int(i) for i in input().split()]
removed_card_sets = []
for i in range(r):
    removed = input()
    removed_card_sets.extend(split_card_sets(removed))

sought_card_sets = []
for i in range(s):
    sought = input()
    sought_card_sets.extend(split_card_sets(sought))


# Removo as cartas
for s in removed_card_sets:
    removed_cards = combine_str(s["cards"], s["suits"])
    for r in removed_cards:
        if r in deck:
            deck.remove(r)

# Levantamento das cartas para previsão
sought_cards = []
for s in sought_card_sets:
    for c in combine_str(s["cards"], s["suits"]):
        if c not in deck:
            continue

        if c not in sought_cards:
            sought_cards.append(c)

probability = len(sought_cards) / len(deck) * 100
print(f"{probability:.0f}%")
