use utils;

fn main() {
    let input = utils::read_input();

    // let x: usize = input
    //     .replace("[]", " ")
    //     .replace("[", "1")
    //     .replace("]", "")
    //     .replace(",", "")
    //     // .replace("[1", "1")
    //     // .replace("[2", "2")
    //     // .replace("[3", "3")
    //     // .replace("[4", "4")
    //     // .replace("[5", "5")
    //     // .replace("[6", "6")
    //     // .replace("[7", "7")
    //     // .replace("[8", "8")
    //     // .replace("[9", "9")
    //     // .replace("[0", "0")
    //     // .replace("]", "")
    //     // .replace(",", "")
    //     .split("\n\n")
    //     .enumerate()
    //     .map(|(pair_index, pair)| {
    //         let (left, right) = pair.split_once("\n").unwrap();
    //         let max = cmp::max(left.len(), right.len());
    //         // left = format!()
    //         let left = format!("{:0<max$}", left, max = max)
    //             .chars()
    //             .collect::<Vec<_>>();
    //         let right = format!("{:0<max$}", right, max = max)
    //             .chars()
    //             .collect::<Vec<_>>();

    //         println!("Pair {}", pair_index + 1);
    //         println!(" left  {:?}", left);
    //         println!(" right {:?}", right);

    //         let mut return_value = pair_index + 1;
    //         for i in 0..max {
    //             if left[i] > right[i] {
    //                 return_value = 0;
    //                 break;
    //             }
    //         }
    //         println!(" correct order: {}", return_value != 0);
    //         return_value
    //     })
    //     .sum();

    // println!("{}", x);

    println!("part1 {}", part1(&input));
}

fn part1(input: &str) -> usize {
    input
        .replace(" ", "")
        .replace("10", "t")
        .replace(",", "")
        .replace("[]", " ")
        .split("\n\n")
        .enumerate()
        .map(|(i, pair)| {
            let mut stack: Vec<&str> = vec![];
            let (left, right) = pair.split_once("\n").unwrap();
            println!("Pair {}", i + 1);
            println!(" left  {:?}", left);
            println!(" right {:?}", right);

            let mut left = left.chars().peekable();
            let mut right = right.chars().peekable();

            // let mut depth_left = 0;
            // let mut depth_right = 0;

            let mut return_value = i + 1;

            loop {
                println!(
                    "  [depth: {:?}] {:?} vs {:?}",
                    // depth_left,
                    // depth_right,
                    stack,
                    left.peek(),
                    right.peek(),
                );

                match (left.peek(), right.peek()) {
                    (None, _) => {
                        break;
                    }
                    (_, None) => {
                        return_value = 0;
                        break;
                    }
                    (Some(' '), Some(' ')) | (Some('['), Some('[')) | (Some(']'), Some(']')) => {
                        left.next();
                        right.next();
                    }
                    (Some('['), Some(_)) => {
                        // r is e or number
                        // depth_left += 1;
                        stack.push("left");
                        left.next();
                    }
                    (Some(']'), Some(r)) => {
                        // l is out of items
                        println!("] vs {}", r);

                        let x = if stack.len() > 0 {
                            stack.pop().unwrap()
                        } else {
                            ""
                        };
                        if x == "left" {
                            left.next();
                        } else {
                            break;
                        }
                        // } else if depth_left > depth_right {
                        //     depth_left -= 1;
                        //     left.next();
                        // } else {
                        //     // println!("input {:?}", input.split("\n\n").collect::<Vec<_>>()[i]);
                        //     return_value = 0;
                        //     break;
                        // }
                    }
                    (Some(_), Some('[')) => {
                        //  l is e or number
                        stack.push("right");
                        // depth_right += 1;
                        right.next();
                    }
                    (Some(_), Some(']')) => {
                        let x = if stack.len() > 0 {
                            stack.pop().unwrap()
                        } else {
                            ""
                        };
                        //  r is out of items
                        if x == "right" {
                            // depth_right -= 1;
                            right.next();
                        } else {
                            return_value = 0;
                            break;
                        }
                    }
                    (Some(l), Some(r)) => {
                        // if l < r {
                        //     // correct order
                        //     break;
                        // }
                        // if l > r {
                        //     // wrong order
                        //     return_value = 0;
                        //     break;
                        // }
                        // left.next();
                        // right.next();

                        if l < r {
                            // correct order
                            break;
                        }
                        if l > r {
                            // wrong order
                            return_value = 0;
                            break;
                        }

                        if stack.is_empty() {
                            left.next();
                            right.next();
                        } else if stack.last().unwrap() == &"left" {
                            println!("only left proceeds");
                            left.next();
                        } else {
                            println!("only right proceeds");
                            right.next();
                        }
                    }
                };
            }

            // println!(
            //     " return_value: {} (correct order: {})",
            //     return_value,
            //     return_value != 0
            // );
            return_value
        })
        .sum::<usize>()
}

#[cfg(test)]
#[test]
fn test_part1() {
    assert_eq!(part1("[1,1,3,1,1]\n[1,1,5,1,1]"), 1);
    assert_eq!(part1("[[1],[2,3,4]]\n[[1],4]"), 1);
    assert_eq!(part1("[9]\n[[8,7,6]]"), 0);
    assert_eq!(part1("[[4,4],4,4]\n[[4,4],4,4,4]"), 1);
    assert_eq!(part1("[7,7,7,7]\n[7,7,7]"), 0);
    assert_eq!(part1("[]\n[3]"), 1);
    assert_eq!(
        part1("[1,[2,[3,[4,[5,6,7]]]],8,9]\n[1,[2,[3,[4,[5,6,0]]]],8,9]"),
        0
    );
    assert_eq!(part1("[0]\n[[1]]"), 1);
    assert_eq!(part1("[[0],[0]]\n[1]"), 1);
    assert_eq!(part1("[[0],[]]\n[1]"), 1);
    assert_eq!(part1("[[0],[2]]\n[[1],[1]]"), 1);
    assert_eq!(part1("[[0],[0]]\n[[1],[1]]"), 1);
    assert_eq!(part1("[[[0]],[0]]\n[[1],[1]]"), 1);
    assert_eq!(part1("[[[1,1]],[0]]\n[[1],[1]]"), 0);
    assert_eq!(part1("[[[1,1]],[0]]\n[[1,1,1],[1]]"), 1);
    assert_eq!(part1("[[],[]]\n[1,1]"), 1);
    assert_eq!(part1("[[]]\n[1,1]"), 1);
    assert_eq!(part1("[[],[[1,2]]]\n[[1,2],[2,[3]]]"), 1);
    assert_eq!(part1("[[],[[[2,5],[3,3],9]],[]]\n[[6,10],[]]"), 1);
    assert_eq!(part1("[[[]]]\n[[1,9]]"), 1);
    assert_eq!(part1("[10]\n[9]"), 0);
    assert_eq!(
        part1(
            // compare [] and [0] -> right order
            "[[[],[3,[]]],[[[7,0,3,3,6]],[3,3]]]\n\
             [[0,9,8],[4,9,[3,[2,8,7,2]],4],[8,0],[4,0,7,[]],[]]"
        ),
        1
    );
    assert_eq!(
        part1(
            "[[[0],[9],[9]]]\n\
             [[0,9,8]]"
        ),
        0
    );
    assert_eq!(
        part1(
            "[[[0],[9,[8]]]]\n\
             [[0,9,8]]"
        ),
        0
    );

    assert_eq!(
        part1(
            "[[[0]]]\n\
             [0,9,8]"
        ),
        1
    );
    assert_eq!(
        part1(
            "[[[0]],[[1]]]\n\
             [0,0]" // [[0]] vs 0
                    // [[0]] vs [0]
                    // [0] vs 0
                    // [0] vs [0]
        ),
        0
    );
    assert_eq!(
        part1(
            "[[[0]],[[0]],[]]\n\
             [0,0]" // [[0]] vs 0
                    // [[0]] vs [0]
                    // [0] vs 0
                    // [0] vs [0]
        ),
        0
    );
    assert_eq!(
        part1(
            "[[0],[[[],8,2,10],[[],[7,8,9,4]]],[2,[[7,10,4,0],1,10],10]]\n\
             [[[[0,5,3,8],4],[5],[[0,2,2,8,0],8,7,[4,8,10]],1]]"
        ),
        // [0]
        // [[[0,5,3,8],4],[5],[[0,2,2,8,0],8,7,[4,8,10]],1]
        //
        // 0
        // [[0,5,3,8],4]
        //
        // [0]
        // [[0,5,3,8],4]
        //
        // 0
        // [0,5,3,8]
        //
        // [0]
        // [0,5,3,8]
        // correct order
        1
    );
    assert_eq!(
        part1(
            "[[[],6,[],1]]\n\
             [[8]]"
        ),
        1
    );
    assert_eq!(
        part1(
            "[    1,[2,3] ]\n\
             [[[[[1,2,   4]]]]]"
        ),
        0
    );
}
