"""REST API for posts."""
from flask import request, abort
import flask
import insta485
import random

@insta485.app.route('/')
def show_index():
    return flask.render_template("index.html")

@insta485.app.route('/api/players/')
def get_players():
  connection = insta485.model.get_db()
    # checking if the like exists
  cur = connection.execute(
      "SELECT * FROM players"
  )
  players = cur.fetchall()
  context = {"players": players}
  return flask.jsonify(**context)

def generate_targets():
    connection = insta485.model.get_db()
    cursor = connection.cursor()

    # Retrieve all players from the database
    cursor.execute("SELECT user_id, username FROM players")
    players = cursor.fetchall()

    # Create a shuffled list of player IDs and usernames to randomize the order
    player_data = [(player['user_id'], player['username']) for player in players]
    random.shuffle(player_data)

    # Initialize a dictionary to store target assignments with usernames
    target_assignments = {}

    for i, (player_id, username) in enumerate(player_data):
        target_id, target_username = player_data[(i + 1) % len(player_data)]  # Assign the next player as the target

        # Update the target_user_id in the database for the current player
        cursor.execute(
            "UPDATE players SET target_user_id = ? WHERE user_id = ?",
            (target_id, player_id)
        )

        target_assignments[username] = target_username

    return target_assignments

@insta485.app.route('/api/players/generate_targets/', methods=['POST'])
def generate_targets_route():
    # Call the generate_targets function to create target assignments and update the SQL table
    target_assignments = generate_targets()

    # Create the response JSON with usernames
    context = {"target_assignments": target_assignments}
    return flask.jsonify(**context)


@insta485.app.route('/api/players/add_player/', methods=['POST'])
def add_player():
    username = request.json
    print(username)
    connection = insta485.model.get_db()
    # cursor = connection.cursor()

    # Insert the new player into the database
    connection.execute(
        "INSERT INTO players (username) VALUES (?)",
        (username,)
    )

    # Regenerate targets and return the updated target assignments
    target_assignments = generate_targets()
    context = {"message": "Player added and targets regenerated", "target_assignments": target_assignments}
    return flask.jsonify(**context)


@insta485.app.route('/api/players/delete_player/<int:user_id>/', methods=['POST'])
def delete_player(user_id):
    connection = insta485.model.get_db()
    cursor = connection.cursor()

    # Retrieve the username of the player to be deleted
    cursor.execute("SELECT username FROM players WHERE user_id = ?", (user_id,))
    username = cursor.fetchone()

    if username:
        username = username['username']

        # Delete the player from the database
        cursor.execute("DELETE FROM players WHERE user_id = ?", (user_id,))

        # Regenerate targets and return the updated target assignments
        target_assignments = generate_targets()
        context = {"message": f"Player {username} deleted and targets regenerated", "target_assignments": target_assignments}
    else:
        context = {"message": "Player not found"}

    return flask.jsonify(**context)