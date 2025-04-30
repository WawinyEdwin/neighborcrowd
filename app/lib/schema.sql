-- User profiles
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    avatar_url TEXT,
    role TEXT NOT NULL CHECK (role IN ('resident', 'hunter', 'scout')),
    neighborhood_id TEXT,
    verified BOOLEAN DEFAULT FALSE,
    points INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Neighborhoods
CREATE TABLE neighborhoods (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    slug TEXT UNIQUE;
    image_url TEXT;
    tip_count INTEGER DEFAULT 0 location JSONB;
    commute_time TEXT;
    average_rent TEXT;
    safety_rating NUMERIC(2, 1);
    amenities TEXT [];
    verified_residents INTEGER DEFAULT 0;

);

-- Building profiles
CREATE TABLE building_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    neighborhood_id TEXT REFERENCES neighborhoods(id),
    description TEXT,
    amenities TEXT [],
    landlord_rating NUMERIC(2, 1),
    overall_rating NUMERIC(2, 1),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Housing tips
CREATE TABLE housing_tips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_profiles(id),
    neighborhood_id TEXT REFERENCES neighborhoods(id),
    building_name TEXT NOT NULL,
    description TEXT NOT NULL,
    contact_info TEXT NOT NULL,
    availability BOOLEAN DEFAULT TRUE,
    images TEXT [],
    verified BOOLEAN DEFAULT FALSE,
    verification_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Verification records
CREATE TABLE verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tip_id UUID REFERENCES housing_tips(id),
    user_id UUID REFERENCES user_profiles(id),
    verified BOOLEAN NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(tip_id, user_id)
);

CREATE OR REPLACE FUNCTION increment(table_name text, column_name text, id uuid) RETURNS integer AS $$ DECLARE result integer;

BEGIN EXECUTE format(
    'UPDATE %I SET %I = %I + 1 WHERE id = %L RETURNING %I',
    table_name,
    column_name,
    column_name,
    id,
    column_name
) INTO result;

RETURN result;

END;

$$ LANGUAGE plpgsql;