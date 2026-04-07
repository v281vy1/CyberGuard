import pygame
import sys

pygame.init()

WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Cyber Mystery - Hunter")

clock = pygame.time.Clock()

# Load sprite frames for each direction
sprites = {
    "left": {
        "walk": [
            pygame.image.load("assets/player/walkleft1.png"),
            pygame.image.load("assets/player/walkleft2.png"),
        ],
        "idle": pygame.image.load("assets/player/idleleft.png")
    },
    "right": {
        "walk": [
            pygame.image.load("assets/player/walkright1.png"),
            pygame.image.load("assets/player/walkright2.png"),
        ],
        "idle": pygame.image.load("assets/player/idleright.png")
    },
    "down": {
        "walk": [
            pygame.image.load("assets/player/walkright1.png"),
            pygame.image.load("assets/player/walkright2.png"),
        ],
        "idle": pygame.image.load("assets/player/idleright.png")
    },
    "up": {
        "walk": [
            pygame.image.load("assets/player/walkleft1.png"),
            pygame.image.load("assets/player/walkleft2.png"),
        ],
        "idle": pygame.image.load("assets/player/idleleft.png")
    }
}

player_x = WIDTH // 2
player_y = HEIGHT // 2
player_speed = 5
current_direction = "right"
frame_index = 0
animation_speed = 0.15
is_moving = False

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()
    is_moving = False

    if keys[pygame.K_w] or keys[pygame.K_UP]:
        player_y -= player_speed
        current_direction = "up"
        is_moving = True
    if keys[pygame.K_s] or keys[pygame.K_DOWN]:
        player_y += player_speed
        current_direction = "down"
        is_moving = True
    if keys[pygame.K_a] or keys[pygame.K_LEFT]:
        player_x -= player_speed
        current_direction = "left"
        is_moving = True
    if keys[pygame.K_d] or keys[pygame.K_RIGHT]:
        player_x += player_speed
        current_direction = "right"
        is_moving = True

    player_x = max(0, min(WIDTH - 32, player_x))
    player_y = max(0, min(HEIGHT - 32, player_y))

    # Animation logic
    if is_moving:
        frame_index += animation_speed
        if current_direction in ("left", "right"):
            move_sequence = [
                sprites[current_direction]["walk"][1],
                sprites[current_direction]["idle"],
                sprites[current_direction]["walk"][0],
                sprites[current_direction]["idle"],
            ]
        else:
            move_sequence = sprites[current_direction]["walk"]

        if frame_index >= len(move_sequence):
            frame_index = 0
        current_frame = move_sequence[int(frame_index) % len(move_sequence)]
    else:
        frame_index = 0
        current_frame = sprites[current_direction]["idle"]

    screen.fill((255, 255, 255))
    screen.blit(current_frame, (player_x, player_y))

    pygame.display.flip()
    clock.tick(60)

pygame.quit()
sys.exit()