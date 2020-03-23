from flask import Flask, jsonify, request, json
from flask_cors import CORS

import random
import logging
import sys
import pandas as pd

app = Flask(__name__)
cors = CORS(app)


@app.route("/", methods=['POST'])
def hello():
    logging.basicConfig(stream=sys.stderr, level=logging.INFO)
    config = request.get_json()
    data = table(config['gameSettings'], config[
                 'basicStrategyTables'], int(config['num_hands']))

    return json_response(data)


def table(config, basicStrategyTables, num_hands):
    def new_deck():
        std_deck = ["2", "3", "4", "5", "6", "7",
                    "8", "9", "10", "J", "Q", "K", "A"]
        mod_deck = list(
            filter(
                lambda x: x not in list(config["removed_card"]),
                std_deck * 4 * int(config["num_deck"]),
            )
        )
        mod_deck = list(
            map(lambda x: x if (x != "J" and x !=
                                "Q" and x != "K") else "10", mod_deck)
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
                if (not is_splitted) or (is_splitted and bool(config['das'])):
                    player.append(deck.pop())
                    return player
                else:
                    player.append(deck.pop())
                    if int(get_num(player)) > 21:
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
        elif int(curr_num) == 0:
            curr_num = '2'

        if soft_table[curr_num][upcard] == "D":
            if (not is_splitted) or (is_splitted and bool(config['das'])):
                player.append(deck.pop())
                return player
            else:
                player.append(deck.pop())
                if int(get_num(player)) > 21:
                    return player
        elif soft_table[curr_num][upcard] == "H":
            player.append(deck.pop())
            if int(get_num(player)) > 21:
                return player
            return soft_round(deck, player, upcard)
        else:
            return player

    def start_round(deck):
        count = 0

        player = []
        dealer = []

        player.append(deck.pop())
        dealer.append(deck.pop())
        player.append(deck.pop())
        dealer.append(deck.pop())

        logging.debug(player)
        logging.debug(dealer[0])

        if is_blackjack(player):
            logging.debug("blackjack!")
            return 1.5
        elif bool(config['surrender']) and (hard_table[get_num(player)][dealer[0]] == 'Su' or soft_table[get_num(player)][dealer[0]] == 'Su'):
            return -0.5
        elif player[0] == player[1]:  # split
            if split_table[get_num([player[0]])][dealer[0]] == "Y":  # do split
                player = [[player[0], deck.pop()], [player[1], deck.pop()]]
                is_splitted = True
                logging.debug(player)
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
        elif "A" in player:  # soft
            player = [soft_round(deck, player, dealer[0])]
        else:  # hard
            player = [hard_round(deck, player, dealer[0])]

        house = dealer_turn(deck, dealer)
        for hand in player:
            logging.debug(str(hand) + " " + str(get_num(hand)))
            logging.debug(str(dealer) + " " + str(get_num(dealer)))

            if int(get_num(hand)) > 21:
                logging.debug(str(hand) + " " + str(get_num(hand)))
                logging.debug("player busts")
                count += -1
            elif house > 21:
                logging.debug("house busts")
                count += 1
            elif int(get_num(hand)) > house:
                logging.debug("won")
                count += 1
            elif int(get_num(hand)) == house:
                logging.debug("push")
                count += 0
            else:
                logging.debug("lose")
                count += -1

        return count

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

    # keep track of game states
    is_splitted = False

    deck, reshuffle_percentage = new_deck()

    logging.info(list(config["removed_card"]))
    logging.info(int(config["num_deck"]))

    total_count = 0
    data = []
    for i in range(0, num_hands):
        if len(deck) < reshuffle_percentage:
            deck, reshuffle_percentage = new_deck()
        total_count += start_round(deck)
        is_splitted = False
        data.append({'chips': total_count})
        logging.debug("---")

    return data


def json_response(payload, status=200):
    return (json.dumps(payload), status, {'content-type': 'application/json'})

if __name__ == '__main__':
    app.run(debug=True)
