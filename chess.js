//Allows the use of prompt()
const prompt = require("prompt-sync")();
//Initial layout of the chess board

let board = [
  [
    { type: "Rook", colour: "black" },
    { type: "Night", colour: "black" },
    { type: "Bishop", colour: "black" },
    { type: "Queen", colour: "black" },
    { type: "King", colour: "black" },
    { type: "Bishop", colour: "black" },
    { type: "Night", colour: "black" },
    { type: "Rook", colour: "black" },
  ],
  [
    { type: "Pawn", colour: "black" },
    { type: "Pawn", colour: "black" },
    { type: "Pawn", colour: "black" },
    { type: "Pawn", colour: "black" },
    { type: "Pawn", colour: "black" },
    { type: "Pawn", colour: "black" },
    { type: "Pawn", colour: "black" },
    { type: "Pawn", colour: "black" },
  ],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [
    { type: "pawn", colour: "white" },
    { type: "pawn", colour: "white" },
    { type: "pawn", colour: "white" },
    { type: "pawn", colour: "white" },
    { type: "pawn", colour: "white" },
    { type: "pawn", colour: "white" },
    { type: "pawn", colour: "white" },
    { type: "pawn", colour: "white" },
  ],
  [
    { type: "rook", colour: "white" },
    { type: "night", colour: "white" },
    { type: "bishop", colour: "white" },
    { type: "queen", colour: "white" },
    { type: "king", colour: "white" },
    { type: "bishop", colour: "white" },
    { type: "night", colour: "white" },
    { type: "rook", colour: "white" },
  ],
];

//Ranks and Files
const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks_count = 8;

//Function to display the board in the console
function display_board() {
  console.log("Displaying Board...");
  //Iterate over each rank and file
  for (let i = 0; i < board.length; i++) {
    let rank = board[i];
    let rank_name = ranks[i];
    let rank_string = rank_name + " | ";
    for (let j = 0; j < rank.length; j++) {
      let square = rank[j];
      if (square.type) {
        //Using the first letter of 'type' to display as the piece type on the board
        rank_string += square.type[0];
        rank_string += " ";
      } else {
        rank_string += ".";
        rank_string += " ";
      }
    }
    console.log(rank_string);
  }
  console.log("    ---------------");
  console.log("    a b c d e f g h");
}

//Function to move a piece, takes A first co-ord and destination co-ord
function move_piece(coor1, coor2) {
  //Checking the validity of the co-ords
  let input_valid = true;
  let y1 = coor1.charAt(0).toLowerCase();
  let y2 = coor2.charAt(0).toLowerCase();
  let x1 = coor1[1];
  let x2 = coor2[1];

  if (files.filter((item) => item === y1).length < 1) {
    input_valid = false;
  } else if (files.filter((item) => item === y2).length < 1) {
    input_valid = false;
  } else if (x1 < 1 || x1 > 8) {
    input_valid = false;
  } else if (x2 < 1 || x2 > 8) {
    input_valid = false;
  }
  if (!input_valid) {
    console.log(
      "One of these co-ordinates is not Valid. Remember to input a-h and 1-8"
    );
  } else {
    //Turning the co-ords into index
    let rank1 = ranks_count - x1;
    let file1 = files.indexOf(y1);

    let rank2 = ranks_count - x2;
    let file2 = files.indexOf(y2);

    let piece_to_move = board[rank1][file1];

    //Deletes the piece on the original co-ordinate
    board[rank1][file1] = {};
    //Adds the piece to destination co-ordinate
    board[rank2][file2] = piece_to_move;
    display_board();
  }
}

//Find the legal moves for a piece on the board.
function get_legal_moves(board, location) {
  let rank1 = ranks_count - location[1];
  let file1 = files.indexOf(location[0]);
  let piece_to_move = board[rank1][file1];
  let piece_type = piece_to_move.type;

  if (piece_type !== "pawn" && piece_type !== "Pawn") {
    return calculate_moves(board, rank1, file1, piece_to_move.colour, piece_type);  
  } else {
    return calculate_pawn_moves(board, rank1, file1, piece_to_move.colour)
  }
}

//Each piece's legal moves
const all_legal_moves = {
  night: [
    [[2, 1]],
    [[2, -1]],
    [[1, 2]],
    [[1, -2]],
    [[-1, 2]],
    [[-1, -2]],
    [[-2, 1]],
    [[-2, -1]],
  ],
  king: [
    [[0, 1]],
    [[0, -1]],
    [[1, 0]],
    [[-1, 0]],
    [[1, 1]],
    [[1, -1]],
    [[-1, 1]],
    [[-1, -1]],
  ],
  rook: [
    [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]], //Direction 1
    [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]], //Direction 2
    [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]], //Direction 3
    [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0]]  //Direction 4
  ],
  bishop: [
    [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]],
    [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7]],
    [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]],
    [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]]
  ],
  queen: [
    [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]],
    [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7]],
    [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]],
    [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]],
    [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]],
    [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]],
    [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]],
    [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0]]
  ],
};

//Function to calculate the legal moves of a given piece.
function calculate_moves(board, rank, file, colour, piece) {
  let valid_moves = [];
  let piece_lower = piece.toLowerCase()
  let legal_moves = all_legal_moves[piece_lower];
  if (piece_lower !== 'night') {
    console.log(`This piece is a ${piece_lower}`)
  } else {
    console.log("This piece is a knight")
  }
 
  for (let direction of legal_moves) { //Iterates through the 3D array of moves
    for (let step of direction) {
      let new_file = file + step[0];
      let new_rank = rank + step[1];

      let on_board = new_file >= 0 && new_file <= 7 && new_rank >= 0 && new_rank <= 7;
      if (on_board) {
        let new_square = board[new_rank][new_file];
        let colours_check = new_square.colour;
        if (colours_check === undefined) {
          valid_moves.push([files[new_file], ranks[new_rank]]);
          continue;
        } else if (colours_check === colour) {
          break; // breaks out of the inner loop
        } else {
          valid_moves.push([files[new_file], ranks[new_rank]]);
          break; // breaks out of the inner loop
        }
      }
    }
  }
  if (valid_moves.length > 0) { //If there are legal moves
    console.log(`The moves available to this ${piece_lower} are:`)
    let formatted_valid_moves = valid_moves.map(valid_move => valid_move.join(""));
    console.log(formatted_valid_moves)
    return formatted_valid_moves
  } else { //If there are not any legal moves
    console.log(`There are no available moves for this ${piece}`)
  }
}

//Function to calculate a pawn's legal moves
function calculate_pawn_moves(board, rank, file, colour) {
  let valid_moves = [];
  let direction = (colour === "white") ? -1:1 //if returns true, -1, if false, 1.
  let new_file = file;
  let new_rank = rank + direction;
  let new_square = board[new_rank][new_file];
  let colours_check = new_square.colour
  if (colours_check === undefined) {
    valid_moves.push([files[new_file], ranks[new_rank]])
    if ((colour === "white" && rank === 6) || (colour === "black" && rank === 1)) {
      new_rank = rank + (direction * 2);
      if (colours_check === undefined) {
        valid_moves.push([files[new_file], ranks[new_rank]])
      }
    }
  }
  //Checking for diagonal captures
  let legal_captures = [[1, direction], [-1, direction]]
  for (let move of legal_captures) {
    new_file = file + move[0];
    new_rank = rank + move[1];
    let on_board = new_file >= 0 && new_file <= 7 && new_rank >= 0 && new_rank <= 7;
    if (on_board) {
      new_square = board[new_rank][new_file];
      if (new_square.colour !== undefined && new_square.colour !== colour) {
        valid_moves.push([files[new_file], ranks[new_rank]]);
      }
    }
  }
  if (valid_moves.length > 0) { //If there are legal moves
    console.log(`The moves available to this pawn are:`)
    let formatted_valid_moves = valid_moves.map(valid_move => valid_move.join(""));
    console.log(formatted_valid_moves)
    return formatted_valid_moves
  } else { //If there are not any legal moves
    console.log(`There are no available moves for this pawn`)
  }
}

function play_chess() { //Main Function to play the game
  display_board()
  let location = prompt(
    "Please enter the co-ordinate of the piece you would like to move (a-h), (1-8), 'leave' to exit:"
  );
  let current_player = "white"
  while (location !== "leave") {
    let rank1 = ranks_count - location[1];
    let file1 = files.indexOf(location[0]);
    let piece_to_move = board[rank1][file1];
    let piece_type = piece_to_move.type;
    if (piece_to_move.colour === current_player){
      if (piece_type === undefined) { // <-- checks if there is a piece present where you chose
        console.log("There is no piece at that location, please pick a valid location.")
      } else {
        let valid_moves = get_legal_moves(board, location)
        if (valid_moves !== null) { // <-- Checks that the piece has legal moves
          let coor1 = location;
          let coor2 = prompt(
          "Please enter one of those co-ordinates to move the piece to:"
          );
          if (valid_moves.includes(coor2)) {
          move_piece(coor1, coor2);


          let king_pos = find_king(board, current_player) //Finds the king's position
          let king_in_check = is_king_in_check(board, current_player, king_pos);

          //Alternate current player to the opposite colour
          current_player = (current_player==="white") ? "black":"white"; // If white returns true, player is switched to black, and vice versa.
          } else {
          console.log("That is not one of the legal moves.");
          }
        }
      }   
    } else {
      console.log(`It is not ${current_player}'s turn to move!`)
    }
    location = prompt(
      "Please enter the co-ordinate of the piece you would like to move (a-h), (1-8), 'leave' to exit:"
    );
  }
}

//Function to locate the king on the board 
function find_king(board, current_player) {
  let king_type = (current_player === "white") ? 'king':'King';
  for (let w = 0; w < 8; w++) {
    for (let h = 0; h < 8; h++) { //Iterate through each piece on the board
      if (board[w][h].type !== undefined) { //Checks that there is a piece at that location
        let piece = board[w][h];
        if (piece && piece.type === king_type) {
          let king_rank = ranks[w]; // Formatting into readeable co-ord
          let king_file = files[h];
          let arr = [king_file, king_rank]
          return [arr.join('')]
        }
      }
    }
  }
  return null;
}

//Function to Work out checks
function is_king_in_check(board, current_player, king_pos) {
  let check_moves = []
  for (m = 0; m < 8; m++) {
    for (n = 0; n < 8; n++) { //Iterate through each piece on the board
      if (board[m][n].type !== undefined) { //Checks that there is a piece at that location
        let piece = board[m][n];
        if (piece && piece.colour !== current_player) { //Checks if the piece is an opponent's
          let check_rank = ranks[m]; //The get_legal_moves takes a co-ordinate such as a1, so It needs to be converted
          let check_file = files[n];
          let arr2 = [check_file, check_rank];
          let moves_var = get_legal_moves(board, arr2.join(''));
          if (moves_var > 0) { //Only adds to check_moves if there are legal moves available
            check_moves.push(...moves_var);
          }
        }
      }
    }
  }
  if (check_moves.includes(king_pos)) { //Checks if an opponents legal move would be able to capture your king- means you are in check
    return true;
  } else {
    return false;
  }
}

play_chess()