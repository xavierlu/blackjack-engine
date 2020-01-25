from flask import Flask, jsonify, request

import random
import multiprocessing
import math
import time
import pandas as pd

app = Flask(__name__)

@app.route("/", methods=['POST'])
def hello():
    some_json = request.get_json()
    table(some_json['gameSettings'], some_json['basicStrategyTables'], int(some_json['num_hands']))

    return jsonify({"you sent": some_json}), 201

def table(config, basicStrategyTables, num_hands):
    def new_deck():
        std_deck = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
        mod_deck = list(
            filter(
                lambda x: x not in list(config["removed_card"]),
                std_deck * int(config["num_deck"]),
            )
        )
        mod_deck = list(
            map(lambda x: x if (x != "J" and x != "Q" and x != "K") else "10", mod_deck)
        )
        random.shuffle(mod_deck)
        return (
            mod_deck,
            random.uniform(
                len(std_deck) * int(config["num_deck"]) * 0.5,
                len(std_deck) * int(config["num_deck"]),
            ),
        )

    def is_blackjack(cards):
        assert len(cards) == 2
        return True if int(get_num(cards)) == 21 else False

    def get_num(cards):
        s = 0
        for c in cards:
            s += int(c) if c != "A" else 11

        if s > 21 and "A" in cards:
            s = 0
            for c in cards:
                s += int(c) if c != "A" else 1

        return str(s)

    def hard_round(deck, player, upcard):
        while int(get_num(player)) < 21 and hard_table[get_num(player)][upcard] != "S":
            if hard_table[get_num(player)][upcard] == "D":
                player.append(deck.pop())
                return player
            else:
                player.append(deck.pop())
                if int(get_num(player)) > 21:
                    return player

        return player

    def soft_round(deck, player, upcard):
        curr_num = get_num([i for i in player if i != "A"])

        if int(curr_num) > 9:
            return hard_round(deck, player, upcard)

        if soft_table[curr_num][upcard] == "D":
            player.append(deck.pop())
            return player
        elif soft_table[curr_num][upcard] == "H":
            player.append(deck.pop())
            if int(get_num(player)) > 21:
                return player
            return soft_round(deck, player, upcard)
        else:
            return player

    def start_round(deck):
        player = []
        dealer = []

        player.append(deck.pop())
        dealer.append(deck.pop())
        player.append(deck.pop())
        dealer.append(deck.pop())

        print(player)
        print(dealer[0])

        if is_blackjack(player):
            print("blackjack!")
            return 1.5
        elif player[0] == player[1]:  # split
            if split_table[get_num([player[0]])][dealer[0]] == "Y":  # do split
                player = [[player[0], deck.pop()], [player[1], deck.pop()]]
                print(player)
                player = [
                    (
                        soft_round(deck, hand, dealer[0])
                        if "A" in hand
                        else hard_round(deck, hand, dealer[0])
                    )
                    for hand in player
                ]
            else:  # don't split
                if "A" in player:
                    player = [soft_round(deck, player, dealer[0])]
                else:
                    player = [hard_round(deck, player, dealer[0])]
            # return 0
        elif "A" in player:  # soft
            player = [soft_round(deck, player, dealer[0])]
        else:  # hard
            player = [hard_round(deck, player, dealer[0])]

        for hand in player:
            if int(get_num(hand)) > 21:
                print(str(hand) + " " + str(get_num(hand)))
                print("player busts")
                return -1

        house = dealer_turn(deck, dealer)
        for hand in player:
            print(str(hand) + " " + str(get_num(hand)))
            print(str(dealer) + " " + str(get_num(dealer)))

            if house > 21:
                print("house busts")
                # return 1
            elif int(get_num(hand)) > house:
                print("won")
                # return 1
            elif int(get_num(hand)) == house:
                print("push")
                # return 0
            else:
                print("lose")
                # return -1

        return 0

    def dealer_turn(deck, dealer):
        if bool(config["soft17"]):
            while int(get_num(dealer)) < 17 or ("A" in dealer and int(get_num(dealer)) == 17):
                dealer.append(deck.pop())
        else:
            while int(get_num(dealer)) < 17:
                dealer.append(deck.pop())

        return int(get_num(dealer))

    hard_table = basicStrategyTables['hard_table']
    soft_table = basicStrategyTables['soft_table']
    split_table = basicStrategyTables['split_table']

    deck, reshuffle_percentage = new_deck()

    # start_round(deck)
    # sum = 0
    for i in range(0, num_hands):
        if len(deck) < reshuffle_percentage:
            deck, reshuffle_percentage = new_deck()
        start_round(deck)
        print("---")

    # print(sum)


if __name__ == '__main__':
    app.run(debug=True)

