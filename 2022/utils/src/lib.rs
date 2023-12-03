use std::{env, fs};

pub fn read_input() -> String {
    let args: Vec<String> = env::args().collect();
    let file_path = if args.len() > 1 {
        &args[1]
    } else {
        "input.txt"
    };

    fs::read_to_string(file_path).expect("Should have been able to read the file")
}
